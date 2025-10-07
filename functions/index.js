const functions = require("firebase-functions");
const admin = require("firebase-admin");
const geoip = require("geoip-lite");

admin.initializeApp();

exports.trackVisitor = functions.https.onCall(async (data, context) => {
  const ip = context.rawRequest.ip;
  const userAgent = context.rawRequest.headers["user-agent"] || "";
  const geo = geoip.lookup(ip);

  const visitorData = {
    ipAddress: ip,
    userAgent: userAgent,
    country: geo ? geo.country : "Unknown",
    region: geo ? geo.region : "Unknown",
    city: geo ? geo.city : "Unknown",
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    screenResolution: data.screenResolution || "Unknown",
    browserInfo: data.browserInfo || "Unknown",
  };

  try {
    await admin.firestore().collection("visitors").add(visitorData);
    console.log("Visitor data saved successfully:", visitorData);
    return { success: true, message: "Visitor tracked." };
  } catch (error) {
    console.error("Error writing visitor data to Firestore:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to track visitor.",
      error.message
    );
  }
});