//
//  cleanurl.js
//  QuoteLink
//
//  Created by Hiroyuki KITAGO on 2025/07/18.
//
//  Based in part on the ClearURLs project (https://github.com/ClearURLs/Rules),
//  adapted with modifications and custom ordering. Licensed under LGPL.
//

const removeParams = [
  // UTM Tracking (Universal)
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'utm_term_id', 'utm_creative', 'utm_placement', 'utm_device', 'utm_adgroup', 'utm_matchtype', 'utm_network', 'utm_adposition', 'utm_loc_interest_ms', 'utm_loc_physical_ms', 'utm_feeditemid', 'utm_target', 'utm_adgroupid', 'utm_campaignid', 'utm_keywordid', 'utm_keyword', 'utm_brand', 'utm_product', 'utm_referrer', 'utm_expid', 'utm_custom', 'utm_viz_id', 'utm_pubreferrer', 'utm_swu', 'utmclid', 'utmsrc', 'utmmed', 'utmcmp', 'utmtrm', 'utmcnt', 'utm_ref', 'utm_exp', 'utm_p', 'utm_c', 'utm_t', 'utm_m', 'utm_s',

  // Google Analytics
  '_gl', '_ga', '_gac', '_gid', '_gcl_au', '_gcl_aw', '_gcl_dc', 'epn.', 'ep.', 'ecid', 'ga_campaign', 'ga_content', 'ga_medium', 'ga_source', 'ga_term', 'ga_id', 'ga_vid', 'ga_sid', 'ga_hid', 'ga_fc', 'ga_dt', 'ga_qt', 'ga_tid', 'ga_cid', 'ga_t', 'ga_uid', 'ga_an', 'ga_av', 'ga_aid', 'ga_aiid', 'ga_ds', 'ga_linkid', 'ga_ni', 'ga_tcc', 'ga_rnd', 'ga_dr', 'ga_dp', 'ga_dh', 'ga_jid', 'ga_gjid', 'ga_cd', 'ga_cm', 'ga_cn', 'ga_cs', 'ga_ck', 'ga_cc', 'ga_ci', 'ga_gid',

  // Google Ads
  'gclid', 'gclsrc', 'dclid', 'wbraid', 'gbraid', 'gad_source',

  // Facebook/Meta
  'fbclid', 'fb_ref', 'fb_source', 'fb_app_id', 'fb_admins', 'fb_page_id', 'fb_ads_id', 'fb_insights_id', 'fb_analytics_id', 'fb_tracking_id', 'fb_pixel_id', 'fb_custom_id', 'fb_conversion_id',

  // Twitter/X
  'twclid', 'tweetid', 'twitter_impression_id', 'twitter_campaign_id', 'twitter_creative_id', 'twitter_ad_id', 'twitter_promoted_id', 'twitter_promoted_tweet_id', 'referrer',

  // Amazon - Tracking
  'smid', 'pf_rd_p', 'pf_rd_r', 'pf_rd_s', 'pf_rd_t', 'pf_rd_i', 'pf_rd_m', 'pd_rd_r', 'pd_rd_w', 'pd_rd_wg', 'pd_rd_i', 'ie',
  
  // Amazon - Affiliate
  'tag', 'linkCode', 'linkId', 'creativeASIN', 'ascsubtag',
  
  // Amazon - referer and session
  'ref', 'ref_', 'refRID', '_encoding',
  
  // Amazon - search result for privacy
  'qid', 'sr', 'keywords', 'sprefix', 'crid',
  
  // Amazon - other tracking
  'dchild', 'content-id', 'dib', 'dib_tag', 'camp', 'creative',

  // Shopify
  'shopify_debug', 'shopify_analytics', 'shop_id', 'shop_campaign', 'shop_source', 'shop_medium', 'shop_term', 'shop_content', 'shopify_pixel', 'cart_id', 'checkout_id', 'checkout_token',

  // Email Marketing
  'mc_cid', 'mc_eid', 'mc_source', 'mc_medium', 'mc_campaign', 'mc_term', 'mc_content', 'mc_id', 'mc_aid', 'mc_linkid',

  // LinkedIn
  'li_fat_id', 'li_source', 'li_medium', 'li_campaign', 'li_term', 'li_content', 'li_id', 'li_vid', 'li_aid', 'li_linkid', 'rcm',

  // HubSpot
  '_hsenc', '_hsmi', 'hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_tgt', 'hsa_kw', 'hsa_mt', 'hsa_net', 'hsa_ver', 'hs_source', 'hs_medium', 'hs_campaign', 'hs_term', 'hs_content', 'hs_id', 'hs_aid', 'hs_linkid',

  // Klaviyo
  'klaviyo_id', 'kl_campaign', 'kl_source', 'kl_medium', 'kl_term', 'kl_content',

  // Pardot
  'pardot_id', 'pi_campaign', 'pi_source', 'pi_medium', 'pi_term', 'pi_content',

  // Additional E-commerce and Marketing
  'mkt_tok', 'mkt_campaign', 'mkt_source', 'mkt_medium', 'mkt_term', 'mkt_content', 's_kwcid', 's_kwcid2', 's_campaign', 's_term', 's_content', 'trc_id', 'trc_campaign', 'trc_source', 'trc_medium', 'banner_id', 'banner_campaign', 'banner_source', 'promo', 'discount', 'coupon', 'offer_id', 'offer_code',

  // Additional Social Media
  'share_token', 'share_ref', 'social_id', 'social_source', 'social_campaign', 'beacon_id', 'beacon_campaign', 'beacon_source', 'linktree_id', 'ltm_source', 'ltm_medium', 'ltm_campaign',

  // Baidu (China)
  'bd_vid', 'bd_source', 'bd_medium', 'bd_campaign', 'bd_term', 'bd_content', 'bd_id', 'bd_aid', 'bd_linkid', 'hmsr', 'hmpl', 'hmcu', 'hmkw', 'hmci',

  // Naver (Korea)
  'naver_source', 'naver_medium', 'naver_campaign', 'naver_term', 'naver_content', 'naver_id', 'naver_aid', 'naver_linkid',

  // Yahoo Japan
  'yjr', 'yjad', 'yjcmp', 'yj_source', 'yj_medium', 'yj_campaign', 'yj_term', 'yj_content', 'yj_id', 'yj_aid', 'yj_linkid',

  // Tencent (China)
  'adtag', 'tc_source', 'tc_medium', 'tc_campaign', 'tc_term', 'tc_content', 'tc_id', 'tc_aid', 'tc_linkid',

  // Yandex
  'yclid', '_openstat', 'ys_source', 'ys_medium', 'ys_campaign', 'ys_term', 'ys_content', 'ys_id', 'ys_aid', 'ys_linkid',

  // Microsoft/Bing
  'msclkid', 'ms_source', 'ms_medium', 'ms_campaign', 'ms_term', 'ms_content', 'ms_id', 'ms_aid', 'ms_linkid',

  // Reddit
  'rdt_cid', 'rdt_source', 'rdt_medium', 'rdt_campaign', 'rdt_content', 'rdt_term', 'rdt_id', 'rdt_aid', 'rdt_linkid', 'reddit_ad_id', 'reddit_campaign_id',

  // Google Tag Manager
  'gtm_id', 'gtm_auth', 'gtm_preview',

  // Mixpanel
  'mixpanel_id', 'mp_campaign', 'mp_source', 'mp_medium', 'mp_term', 'mp_content',

  // Amplitude
  'amplitude_id', 'amp_campaign', 'amp_source', 'amp_medium', 'amp_term', 'amp_content',

  // Snowplow
  'snowplow_id', 'sp_campaign', 'sp_source', 'sp_medium', 'sp_term', 'sp_content',

  // Heap Analytics
  'heap_id', 'hp_campaign', 'hp_source', 'hp_medium', 'hp_term', 'hp_content',

  // Privacy and Consent Tracking
  'consent_id', 'consent_token', 'gdpr_id', 'gdpr_consent', 'ccpa_id', 'ccpa_optout', 'cookie_id', 'cookie_consent', 'tracking_consent',

  // Web3 and Blockchain-related
  'nft_id', 'nft_campaign', 'nft_source', 'nft_medium', 'nft_term', 'nft_content', 'nft_wallet_id', 'nft_tx_id', 'crypto_id', 'blockchain_id', 'web3_tracker', 'dapp_id', 'dapp_campaign', 'dapp_source', 'dapp_medium', 'dapp_term', 'dapp_content',

  // Japanese Ad and Marketing
  'cid', 'rid', 'adid', 'free4', 'dmai', 'argument', 'sub_rt', 'spid', 'prid', 'aspid', 'mid', 'cpt_s', 'cpt_m', 'cpt_n', 'cpt_c', 'scadid', 
  
  // Aliexpress
  'aff_fcid', 'tt', 'aff_fsk', 'aff_platform', 'sk', 'aff_trace_key', 'terminal_id', 'afSmartRedirect', 'gatewayAdapt',

  // Adobe - marketing
  'sdid', 'mv', 'mv2',

  // Additional Canditates for General Tracking Parameters
//  'wickedid', 'mbid', 'vero_conv', 'elqTrackId', 'icid', 'experiment_id', 'campaignid', 'adid', 'clickid', 'tracking_id', 'sessionid', 's_cid', 'scid', 'source', 'medium', 'campaign', 'term', 'content', 'partner_id', 'email_id', 'newsletter_id', 'ab_test', 'variant', 'test_id', 'cid', 'sid', 'vid', 'hid', 'tid', 'uid', 'pid', 'rid', 'lid', 'gid', 'aid', 'bid', 'did', 'eid', 'fid', 'iid', 'jid', 'kid', 'mid', 'nid', 'oid', 'qid', 'xid', 'yid', 'zid', 'cndid', 'cmpid', 'crtid', 'adgid', 'kyid', 'mtid', 'ntwid', 'devid', 'trkid', 'clid', 'adclid', 'conv_id', 'evt_id', 'sess_id', 'usr_id', 'vis_id', 'session_id', 'user_id', 'visitor_id', 'tracking_code', 'campaign_code', 'ad_code', 'exp_id', 'exp_variant', 'ab_id', 'ab_variant', 'test_variant', 'click_id', 'link_id', 'track_id', 'event_id', 'conversion_id', 'src', 'cmp', 'cnt', 'trm', 'med', 'adgrpid', 'adpos', 'kwid', 'kw', 'mt', 'net', 'loc', 'dev', 't_id', 's_id', 'v_id', 'h_id', 'c_id', 'u_id', 'a_id', 'p_id', 'r_id', 'l_id', 'g_id', 'z_id', 'x_id', 'y_id', 'w_id', 'k_id', 'm_id', 'n_id', 'o_id', 'q_id', 'track', 'tracker', 'analytics_id', 'data_id', 'source_id', 'medium_id', 'campaign_id', 'adgroup_id', 'keyword_id', 'placement_id', 'creative_id', 'network_id', 'referral_id', 'referral_code', 'share_id', 'share_code', 'geo_id', 'geo_loc', 'geo_campaign', 'geo_source', 'geo_medium', 'device_id', 'device_type', 'os_id', 'os_version', 'browser_id', 'exp_group', 'exp_test', 'exp_segment', 'ab_group', 'ab_segment', 'pixel', 'beacon', 'tag', 'event', 'conversion', 'click', 'view', 'ad_tracker', 'ad_analytics', 'ad_pixel', 'ad_event', 'ad_conversion'
];

export const getCleanUrl = (url, isCleanUrl=true) => {
  try {
    const urlObj = new URL(url);
    if (!isCleanUrl) return urlObj.toString();
    
    removeParams.forEach(param => urlObj.searchParams.delete(param));

    return urlObj.toString();
  } catch (error) {
    console.error('[CleanURLExtension] Invalid URL:', error);
    return url;
  }
};
