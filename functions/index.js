const functions = require("firebase-functions");
const admin = require("firebase-admin");
const geoip = require("geoip-lite");

admin.initializeApp();

// Эта секция указывает Firebase запускать функцию с большим объёмом памяти
const runtimeOpts = {
  timeoutSeconds: 60,
  memory: "512MB",
};

// --- ЭТО И ЕСТЬ РЕШЕНИЕ ---
// Мы указываем Firebase запускать эту функцию в том же регионе, где находится ваша база данных.
exports.trackVisitor = functions
  .region("europe-west1") // Указываем правильный регион
  .runWith(runtimeOpts)   // Применяем настройки памяти
  .https.onCall(async (data, context) => {
    
    // IP-адрес посетителя из заголовков запроса.
    const ip = context.rawRequest.ip;

    // User-Agent для определения браузера и устройства
    const userAgent = context.rawRequest.headers["user-agent"] || "";

    // Геолокация на сервере
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
      // Сохраняем данные в коллекцию "visitors" в Firestore.
      await admin.firestore().collection("visitors").add(visitorData);
      console.log("Данные посетителя успешно сохранены:", visitorData);
      return { success: true, message: "Посетитель отслежен." };
    } catch (error) {
      console.error("Ошибка записи данных посетителя в Firestore:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Не удалось отследить посетителя.",
        error.message
      );
    }
  });