# Netlify Deployment Guide
## Taking "1000 Ways to Arrive" Live on Main Branch

This guide will walk you through deploying your clean, consolidated single-file application to Netlify from the `main` branch.

---

## Prerequisites

✅ Repository: `TheAlienSchool/terminal-ei`
✅ Branch: `main` (merged with clean consolidated version)
✅ Netlify Site: `echoei` (https://app.netlify.com/sites/echoei)
✅ GitHub Account: Connected to Netlify

---

## Part 1: Merge Latest README to Main

The README has been updated to reflect the evolution to "1000 Ways to Arrive." Let's merge it to main:

### Step 1.1: Create Pull Request for README Update

1. Go to: **https://github.com/TheAlienSchool/terminal-ei/pulls**
2. Click **"New pull request"**
3. Set:
   - **Base:** `main`
   - **Compare:** `claude/fix-pages-deployment-01QvYRaHfZkCDBghWi7TjZg1`
4. You should see 1 changed file: `README.md` (+117 additions, -27 deletions)
5. Click **"Create pull request"**
6. Add title: `Update README: Honor journey evolution to 1000 Ways to Arrive`
7. Click **"Create pull request"** again
8. Click **"Merge pull request"**
9. Click **"Confirm merge"**

✅ **Result:** Main branch now has the updated README documenting your journey

---

## Part 2: Configure Netlify Site Settings

Now let's configure Netlify to deploy from the `main` branch with correct settings.

### Step 2.1: Access Site Settings

1. Go to: **https://app.netlify.com/sites/echoei/configuration/general**
2. Log in with your GitHub account if prompted

### Step 2.2: Verify Repository Connection

Scroll down to **"Site details"** and verify:
- **Repository:** Should show `TheAlienSchool/terminal-ei`
- If not connected, click **"Link repository"** and authorize GitHub access

### Step 2.3: Configure Build Settings

1. Navigate to: **https://app.netlify.com/sites/echoei/configuration/deploys**
2. Under **"Build settings"**, click **"Edit settings"**
3. Set the following:

   ```
   Production branch: main
   ```

4. Scroll to **"Build command"** and ensure it's **blank** (no build needed)
5. Set **"Publish directory"** to: `.` (just a period)
6. Click **"Save"**

### Step 2.4: Configure Deploy Contexts (Optional but Recommended)

Still on the Build settings page:

1. Scroll to **"Deploy contexts"**
2. Under **"Branch deploys"**, select:
   - ✅ **Deploy only the production branch**

   This prevents automatic deploys from feature branches.

3. Click **"Save"**

---

## Part 3: Trigger Production Deploy

### Step 3.1: Manual Deploy Trigger

1. Navigate to: **https://app.netlify.com/sites/echoei/deploys**
2. Click the **"Trigger deploy"** dropdown in the top right
3. Select **"Deploy site"**
4. Netlify will begin building from the `main` branch

### Step 3.2: Monitor Deploy Progress

Watch the deploy log. You should see:

```
12:00:00 PM: Build ready to start
12:00:01 PM: Fetching cached dependencies
12:00:02 PM: Starting to deploy site from '.'
12:00:03 PM: Skipping build command
12:00:04 PM: Deploying from branch: main
12:00:05 PM: Processing files...
12:00:06 PM: Site is live ✨
```

**Expected duration:** ~30-60 seconds

### Step 3.3: Verify Deploy Success

Once the deploy completes, you'll see:

- ✅ Green checkmark: **"Published"**
- 🔗 **Deploy URL** (e.g., `https://echoei.netlify.app`)
- 📅 Timestamp of deployment

---

## Part 4: Quality Assurance Check

### Step 4.1: Visit Live Site

Click the **"Open production deploy"** button or visit your site URL.

### Step 4.2: Verify Core Elements

**Homepage Check:**
- ✅ Title should read: **"1000 Ways to Arrive :: An Echo-locative Insights Survey"**
- ✅ Header should show: **"1000 Ways to Arrive"**
- ✅ Subheading: **"An Echo-locative Insights Survey :: In a San Francisco Sonic Sanctuary"**

**Browser Console Check (F12 → Console):**
- ✅ Should show **zero 404 errors**
- ✅ No missing file errors
- ✅ No external resource requests failing

**Network Tab Check (F12 → Network):**
- ✅ Should load only **1 file**: `index.html` (76KB)
- ✅ No requests for `ei.css` or `ei.js`
- ✅ All styles and scripts inline

### Step 4.3: Feature Testing

Test key functionality:

1. **"I Am Here" Button** – Should activate presence mode
2. **Verbrations** – Hover over 7 verbs (SENSE, CATCH, NAME, MOVE, TUNE, OPEN, SHIFT) to see whisper tooltips
3. **The Sitting Room** – Click "The Sitting Room" to enter fullscreen cinematic mode (press ESC to exit)
4. **Breath Guide** – Start breathing timer, watch 14-second cycles
5. **Journey Reflection** – Complete a cabin note
6. **Export Journey** – Download JSON file of your journey

---

## Part 5: Custom Domain (Optional)

If you want to use a custom domain like `1000waystosit.com`:

### Step 5.1: Add Custom Domain

1. Go to: **https://app.netlify.com/sites/echoei/configuration/domain**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `1000waystosit.com`)
4. Click **"Verify"**
5. Netlify will provide DNS configuration instructions

### Step 5.2: Configure DNS

In your domain registrar (e.g., Namecheap, GoDaddy):

1. Add **A Record**:
   - Type: `A`
   - Name: `@`
   - Value: `75.2.60.5` (Netlify's load balancer)

2. Add **CNAME Record** (for www):
   - Type: `CNAME`
   - Name: `www`
   - Value: `echoei.netlify.app`

### Step 5.3: Enable HTTPS

1. Back in Netlify, go to: **https://app.netlify.com/sites/echoei/configuration/domain**
2. Under **"HTTPS"**, click **"Verify DNS configuration"**
3. Once DNS propagates (~5-60 minutes), click **"Provision certificate"**
4. Netlify will automatically provision a free Let's Encrypt SSL certificate

✅ **Result:** Your site is now live at your custom domain with HTTPS

---

## Part 6: Post-Deployment Maintenance

### Automatic Deploys

Going forward, any commits pushed to the `main` branch will automatically trigger a Netlify deploy.

**Workflow:**
1. Make changes on a feature branch
2. Create PR to `main` on GitHub
3. Merge PR
4. Netlify auto-deploys within ~30 seconds

### Deploy Notifications

To receive deploy status updates:

1. Go to: **https://app.netlify.com/sites/echoei/configuration/notifications**
2. Click **"Add notification"**
3. Choose notification type:
   - **Email** – Get notified on deploy success/failure
   - **Slack** – Post to Slack channel
   - **Webhook** – Custom webhook endpoint

---

## Troubleshooting

### Issue: "Deploy Failed"

**Check:**
- Ensure `main` branch has the consolidated `index.html`
- Verify publish directory is `.` (period)
- Ensure build command is blank

### Issue: "404 - File Not Found"

**Check:**
- Publish directory should be `.` not `/` or `/public`
- Ensure `index.html` is at repository root

### Issue: "Site Shows Old Version"

**Fix:**
1. Clear deploy cache: **https://app.netlify.com/sites/echoei/deploys** → "Clear cache and retry deploy"
2. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Issue: "CSS/JS Not Loading"

**This should not happen** with the consolidated file. If it does:
- Check browser console for errors
- Verify `index.html` contains `<style>` and `<script>` tags
- Confirm no external `<link>` or `<script src>` tags

---

## Success Criteria ✅

Your deployment is successful when:

- ✅ Site loads at Netlify URL (e.g., `https://echoei.netlify.app`)
- ✅ Title reads: "1000 Ways to Arrive :: An Echo-locative Insights Survey"
- ✅ Browser console shows zero errors
- ✅ Network tab shows only `index.html` loaded (76KB)
- ✅ All interactive features work (breath guide, verbrations, Sitting Room)
- ✅ Mobile responsive on all device sizes
- ✅ `main` branch is configured as production branch
- ✅ Future commits to `main` auto-deploy

---

## Summary

**What You've Accomplished:**

1. ✅ Merged clean, consolidated single-file architecture to `main`
2. ✅ Updated README to honor project evolution
3. ✅ Configured Netlify to deploy from `main` branch
4. ✅ Achieved zero-build-process deployment
5. ✅ Launched "1000 Ways to Arrive" live to the web
6. ✅ Established automated deployment pipeline

**Project Metrics:**
- **Single file:** 76KB, 2,627 lines
- **Zero dependencies:** Fully self-contained
- **66% size reduction:** From bloated multi-file to pristine single-file
- **PlayHTML.fun compliant:** View source, learn, remix

---

## Resources

- **Netlify Dashboard:** https://app.netlify.com/sites/echoei
- **GitHub Repository:** https://github.com/TheAlienSchool/terminal-ei
- **Netlify Documentation:** https://docs.netlify.com/
- **PlayHTML.fun Philosophy:** https://playhtml.fun/

---

**Breathe. Deploy. Arrive.**

*Created with care by Kamau Zuberi Akabueze (KzA) and Claude*
