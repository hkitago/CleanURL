//
//  AppDelegate.swift
//  macOS (App)
//
//  Created by Hiroyuki KITAGO on 2025/11/27.
//

import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {

  func applicationDidFinishLaunching(_ notification: Notification) {
      // Override point for customization after application launch.
      guard let window = NSApplication.shared.windows.first else { return }

      let appName = (Bundle.main.object(forInfoDictionaryKey: "CFBundleDisplayName") as? String)
          ?? (Bundle.main.object(forInfoDictionaryKey: "CFBundleName") as? String)
          ?? "App"

      window.titleVisibility = .hidden
      window.titlebarAppearsTransparent = true

      let titleLabel = NSTextField(labelWithString: appName)
      titleLabel.font = NSFont.systemFont(ofSize: 14, weight: .semibold)
      titleLabel.alignment = .center
      titleLabel.textColor = .labelColor

      if let titlebarView = window.standardWindowButton(.closeButton)?.superview {
          titlebarView.addSubview(titleLabel)

          titleLabel.translatesAutoresizingMaskIntoConstraints = false
          NSLayoutConstraint.activate([
              titleLabel.centerXAnchor.constraint(equalTo: titlebarView.centerXAnchor),
              titleLabel.centerYAnchor.constraint(equalTo: titlebarView.centerYAnchor)
          ])
      }
  }

  func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
      return true
  }

}
