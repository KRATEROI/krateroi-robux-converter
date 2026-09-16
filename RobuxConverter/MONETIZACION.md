# Google AdSense and free hosting setup

This site is a static website owned and maintained by **Krateroi**. The ad layout is already wired into the homepage, guides, and privacy page. Before AdSense is enabled, each placement shows a labeled placeholder and no advertising script is loaded.

## Ad spaces already included

`ads.js` provides four shared placements:

- `left` and `right`: sticky 160x600 desktop rail slots.
- `content`: responsive slot inside the calculator or guide content.
- `anchor`: responsive bottom slot that can be closed.

The same `ads.js` file is loaded by every page, so one configuration activates all pages.

## Publish for free

Use GitHub Pages if you want the simplest free host:

1. Create a GitHub repository and upload the project files.
2. Open the repository's **Settings → Pages**.
3. Select **Deploy from a branch**, choose the default branch and `/ (root)`, then save.
4. Wait for the deployment and open the HTTPS URL GitHub provides.
5. Use the free `github.io` URL initially, or connect a domain you own. AdSense requires a publicly accessible HTTPS site; it will not approve `file://` or `localhost`.

Netlify, Cloudflare Pages, and Vercel are also free options. Import the repository, leave the build command empty, and publish the project root.

## Connect Google AdSense

1. Make sure the live site has useful original content, an English privacy policy, navigation, and the Krateroi branding.
2. Visit [Google AdSense](https://adsense.google.com), sign in, and create an account.
3. Add the exact public site URL and complete Google's identity, address, and payment details.
4. In AdSense, open **Sites**, add the site, and copy the verification snippet Google provides into the `<head>` of `index.html` if Google asks for it. The existing `ads.js` script is for serving ads after approval; it does not replace Google's site verification.
5. Wait for Google to review and approve the site. Do not enable live ads before approval.
6. After approval, open **Ads → By ad unit → Display ads** and create four units. Use responsive units for `content` and `anchor`, and a suitable vertical display unit for `left` and `right`.
7. Copy the publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`) and the four 10-digit slot IDs into the `ADS` object at the top of `ads.js`:

   ```js
   const ADS = {
     enabled: true,
     client: "ca-pub-XXXXXXXXXXXXXXXX",
     slots: {
       left: "1111111111",
       right: "2222222222",
       content: "3333333333",
       anchor: "4444444444"
     }
   };
   ```

8. Copy `ads.txt.example` to a new root-level file named `ads.txt`. Replace `PUB_ID` with the numeric part of your publisher ID. For example, `ca-pub-1234567890123456` becomes:

   ```text
   google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
   ```

9. Commit and redeploy `ads.js` and `ads.txt`.
10. In AdSense, confirm that `https://your-domain.example/ads.txt` is reachable. It can take time for Google to detect the file and for ads to begin filling.

Publisher IDs and ad slot IDs are public identifiers. Never put bank details, passwords, API secrets, or private credentials in this project.

## Important policy steps

- Do not click your own ads or encourage anyone else to click them.
- Keep the privacy policy accurate and disclose Google advertising cookies and consent requirements for your visitors' locations.
- Use Google's consent tools where required by law.
- Keep the site's “not affiliated with Roblox Corporation” notice.
- Ads can show blank space while Google evaluates traffic, inventory, or consent. That is normal and not a code failure.

The placeholders remain available whenever `enabled` is `false`, the publisher ID is invalid, or a slot is still set to zeros.
