//
//  ViewController.swift
//  Shared (App)
//
//  Created by Hiroyuki KITAGO on 2025/11/27.
//

import WebKit

#if os(iOS)
import UIKit
typealias PlatformViewController = UIViewController
#elseif os(macOS)
import Cocoa
import SafariServices
typealias PlatformViewController = NSViewController
#endif

let extensionBundleIdentifier = "com.hkitago.CleanURL.Extension"

class ViewController: PlatformViewController, WKNavigationDelegate, WKScriptMessageHandler {

    @IBOutlet var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        #if os(macOS)
        webView.setValue(false, forKey: "drawsBackground")
        webView.setValue(NSColor.clear, forKey: "backgroundColor")
        #endif

        self.webView.navigationDelegate = self

        #if os(iOS)
        self.webView.scrollView.isScrollEnabled = false
        #endif

        self.webView.configuration.userContentController.add(self, name: "controller")

        self.webView.loadFileURL(
            Bundle.main.url(forResource: "Main", withExtension: "html")!,
            allowingReadAccessTo: Bundle.main.resourceURL!
        )
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {

        #if os(iOS)
        webView.evaluateJavaScript("show('ios')")

        #elseif os(macOS)
        webView.evaluateJavaScript("show('mac')")

        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
            guard let state = state, error == nil else {
                return
            }

            DispatchQueue.main.async {
                if #available(macOS 13, *) {
                    webView.evaluateJavaScript("show('mac', \(state.isEnabled), true)")
                } else {
                    webView.evaluateJavaScript("show('mac', \(state.isEnabled), false)")
                }
            }
        }
        #endif
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {

        let messageBody = message.body as! String
        var url: URL?

        if messageBody == "open-support" {
            url = URL(string: "https://github.com/hkitago/CleanURL/")
        }

        #if os(macOS)

        if messageBody == "open-preferences" {
            SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
                guard error == nil else { return }

                DispatchQueue.main.async {
                    NSApp.terminate(self)
                }
            }
            return
        }

        if let validURL = url {
            NSWorkspace.shared.open(validURL)
        }

        #elseif os(iOS)

        if messageBody == "open-settings" {
            url = URL(string: UIApplication.openSettingsURLString)
        }

        if let validURL = url {
            UIApplication.shared.open(validURL)
        }

        #endif
    }
}

