# Google Sheets API Setup Guide
## For North Harbour Rugby Performance Hub Integration

This guide will help you set up Google API credentials to connect your Google Sheets data directly to your rugby performance dashboard.

---

## 🚀 Quick Setup Steps

### Step 1: Create a Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Select a project" at the top
   - Click "NEW PROJECT"
   - Project name: `North Harbour Rugby Hub`
   - Click "CREATE"

### Step 2: Enable Google Sheets API

1. **Navigate to APIs & Services**
   - In the left sidebar, click "APIs & Services" → "Library"

2. **Enable Google Sheets API**
   - Search for "Google Sheets API"
   - Click on "Google Sheets API"
   - Click "ENABLE"

### Step 3: Create Service Account Credentials

1. **Go to Credentials**
   - Click "APIs & Services" → "Credentials"

2. **Create Service Account**
   - Click "CREATE CREDENTIALS" → "Service account"
   - Service account name: `nh-rugby-dashboard`
   - Service account ID: `nh-rugby-dashboard`
   - Click "CREATE AND CONTINUE"

3. **Set Role (Optional)**
   - You can skip this step for now
   - Click "CONTINUE"

4. **Generate Key**
   - Click "CREATE KEY"
   - Select "JSON"
   - Click "CREATE"
   - **Save the downloaded JSON file securely!**

### Step 4: Extract Credentials from JSON

Open the downloaded JSON file and find these two values:

```json
{
  "client_email": "nh-rugby-dashboard@your-project.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYour very long private key here\n-----END PRIVATE KEY-----\n"
}
```

### Step 5: Add Credentials to Your Dashboard

You'll need to provide these two values as environment variables:

1. **GOOGLE_CLIENT_EMAIL**: The `client_email` from your JSON file
2. **GOOGLE_PRIVATE_KEY**: The `private_key` from your JSON file

---

## 📊 Prepare Your Google Sheets

### Sheet Structure

Create a Google Spreadsheet with these sheets:

#### 1. "Players" Sheet (Column Headers - Row 1):
```
A: Name | B: Position | C: Jersey# | D: Weight | E: Height | F: Age | G: Fitness Score | H: Injury Status | I: Last Match | J: GPS Distance | K: Top Speed | L: Tackles | M: Carries | N: Pass Accuracy
```

**Example Data Row:**
```
Jake Thompson | Hooker | 2 | 105 | 185 | 25 | 85 | Available | 2025-01-15 | 6.2 | 28.5 | 12 | 8 | 92
```

#### 2. "Matches" Sheet (Column Headers - Row 1):
```
A: Date | B: Opponent | C: Result | D: Player Name | E: Minutes Played | F: Tries | G: Assists | H: Tackles | I: Missed Tackles | J: Carries | K: Meters Gained | L: Pass Accuracy | M: Lineout Success | N: Scrum Success
```

#### 3. "Training" Sheet (Column Headers - Row 1):
```
A: Date | B: Player Name | C: Training Type | D: Duration | E: Intensity | F: Load Score | G: RPE | H: Notes
```

#### 4. "Medical" Sheet (Column Headers - Row 1):
```
A: Player Name | B: Injury Type | C: Injury Date | D: Expected Return | E: Current Status | F: Treatment Notes | G: Clearance Status
```

### Share Your Spreadsheet

**Important:** Share your Google Spreadsheet with the service account email:

1. Open your Google Spreadsheet
2. Click "Share" button
3. Add the service account email: `nh-rugby-dashboard@your-project.iam.gserviceaccount.com`
4. Give "Viewer" permissions
5. Click "Send"

---

## 🔧 Testing the Integration

Once you have your credentials:

1. **Navigate to Data Integration**
   - Go to `/data-integration` in your dashboard

2. **Enter Your Spreadsheet**
   - Paste your Google Sheets URL or ID

3. **Preview Data**
   - Click "Preview Data" to see your player information

4. **Sync Players**
   - Click "Sync Player Data" to import into your dashboard

---

## 🔐 Security Best Practices

1. **Keep JSON File Secure**: Never share or commit the service account JSON file
2. **Limit Access**: Only give the service account access to specific spreadsheets
3. **Monitor Usage**: Check Google Cloud Console for API usage
4. **Rotate Keys**: Periodically create new service account keys

---

## 📋 Sample Data Template

Here's a sample Google Sheets template you can copy:

### Players Sheet Example:
| Name | Position | Jersey# | Weight | Height | Age | Fitness Score | Injury Status | Last Match | GPS Distance | Top Speed | Tackles | Carries | Pass Accuracy |
|------|----------|---------|--------|--------|-----|---------------|---------------|------------|--------------|-----------|---------|---------|---------------|
| Jake Thompson | Hooker | 2 | 105 | 185 | 25 | 85 | Available | 2025-01-15 | 6.2 | 28.5 | 12 | 8 | 92 |
| Mike Wilson | Prop | 1 | 120 | 180 | 28 | 78 | Available | 2025-01-15 | 5.8 | 25.2 | 8 | 12 | 88 |
| Sam Roberts | Lock | 4 | 115 | 195 | 24 | 88 | Minor Strain | 2025-01-10 | 6.8 | 27.1 | 15 | 6 | 85 |

---

## 🆘 Troubleshooting

### Common Issues:

1. **"Failed to preview data"**
   - Check that your service account email has access to the spreadsheet
   - Verify the spreadsheet ID is correct

2. **"Authentication failed"**
   - Ensure GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY are set correctly
   - Check that the Google Sheets API is enabled

3. **"No data found"**
   - Verify your sheet names match ("Players", "Matches", etc.)
   - Check that data starts from row 2 (row 1 should be headers)

### Getting Help:

If you encounter issues:
1. Check the browser console for error messages
2. Verify your spreadsheet permissions
3. Test with a simple 2-3 row dataset first

---

## 🎯 Next Steps

Once your credentials are set up:

1. **Test with Sample Data**: Start with a few player records
2. **Expand Data**: Add more comprehensive player statistics
3. **Automate Updates**: Set up regular data syncing
4. **Train Staff**: Show coaches how to update the spreadsheet

Your North Harbour Rugby Performance Hub will now have live, real player data flowing directly from your Google Sheets!

---

**Ready to transform your rugby analytics with real data? Let's get those credentials set up!**