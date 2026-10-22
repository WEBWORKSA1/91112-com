/* 91112.com site configuration.
   Payment links: paste a PayPal / Stripe Payment Link / Buy Me a Coffee / Razorpay URL to switch
   the Support page from "pledge" mode to instant checkout. Leave blank to keep pledges.
   Video IDs live in the HTML (data-yt attributes) — swap any ID to change a video. */
window.SITE = {
  name: "91112 World Emergency & Safety Hub",
  domain: "91112.com",
  ownerContactUrl: "https://web.works/contact",
  adsenseClient: "ca-pub-6620975821265271",
  payments: {
    paypal: "",        // e.g. https://www.paypal.com/donate/?hosted_button_id=XXXX
    stripe: "",        // e.g. https://buy.stripe.com/XXXX
    buymeacoffee: "",  // e.g. https://www.buymeacoffee.com/yourname
    razorpay: ""       // e.g. https://razorpay.me/@yourname (India / UPI)
  },
  donationGoal: { raised: 0, goal: 5000, currency: "USD" },
  /* Form relay key (encoded). Keep it encoded — never paste a plain address here. */
  _k: ["MWFza3Jvd2Jldw==", "bW9jLmxpYW1n"]
};
