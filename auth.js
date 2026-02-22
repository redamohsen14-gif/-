// ==========================================
// js/auth.js - نظام المصادقة والحماية
// ==========================================

// ---- حماية الصفحات المحمية (تتطلب تسجيل دخول) ----
function requireAuth() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      // تحميل بيانات المستخدم
      loadCurrentUser(user);
    }
  });
}

// ---- حماية صفحة تسجيل الدخول (إذا كان مسجلاً دخوله، اذهب للرئيسية) ----
function requireGuest() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.href = "index.html";
    }
  });
}

// ---- تحميل بيانات المستخدم الحالي ----
async function loadCurrentUser(user) {
  try {
    const doc = await db.collection("users").doc(user.uid).get();
    if (doc.exists) {
      const userData = doc.data();
      window.currentUser = { uid: user.uid, email: user.email, ...userData };
      updateUserUI(userData);
    }
  } catch (error) {
    console.error("خطأ في تحميل بيانات المستخدم:", error);
  }
}

// ---- تحديث واجهة المستخدم ----
function updateUserUI(userData) {
  const nameEl = document.getElementById("current-user-name");
  const roleEl = document.getElementById("current-user-role");
  const avatarEl = document.getElementById("user-avatar-text");

  if (nameEl) nameEl.textContent = userData.name || "مستخدم";
  if (roleEl) roleEl.textContent = userData.role === "admin" ? "مدير النظام" : "مستخدم";
  if (avatarEl) avatarEl.textContent = (userData.name || "م").charAt(0);
}

// ---- تسجيل الدخول ----
async function signIn(email, password) {
  try {
    showLoading(true);
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    // تحديث آخر دخول
    await db.collection("users").doc(userCredential.user.uid).update({
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast("تم تسجيل الدخول بنجاح", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 1000);
  } catch (error) {
    showLoading(false);
    let msg = "حدث خطأ في تسجيل الدخول";
    if (error.code === "auth/user-not-found") msg = "البريد الإلكتروني غير مسجل";
    if (error.code === "auth/wrong-password") msg = "كلمة المرور غير صحيحة";
    if (error.code === "auth/invalid-email") msg = "صيغة البريد الإلكتروني غير صحيحة";
    if (error.code === "auth/too-many-requests") msg = "تم تجاوز عدد المحاولات، حاول لاحقاً";
    showToast(msg, "error");
  }
}

// ---- إنشاء مستخدم جديد (Admin فقط) ----
async function createUser(name, email, password, role) {
  try {
    // إنشاء المستخدم في Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;

    // حفظ بيانات المستخدم في Firestore
    await db.collection("users").doc(uid).set({
      name: name,
      email: email,
      role: role || "user",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastLogin: null,
      isActive: true
    });

    showToast("تم إنشاء المستخدم بنجاح", "success");
    return { success: true, uid };
  } catch (error) {
    let msg = "حدث خطأ في إنشاء المستخدم";
    if (error.code === "auth/email-already-in-use") msg = "البريد الإلكتروني مستخدم بالفعل";
    if (error.code === "auth/weak-password") msg = "كلمة المرور ضعيفة (6 أحرف على الأقل)";
    if (error.code === "auth/invalid-email") msg = "صيغة البريد الإلكتروني غير صحيحة";
    showToast(msg, "error");
    return { success: false, error: msg };
  }
}

// ---- تسجيل الخروج ----
async function signOut() {
  try {
    await auth.signOut();
    window.location.href = "login.html";
  } catch (error) {
    showToast("حدث خطأ في تسجيل الخروج", "error");
  }
}

// ---- إعادة تعيين كلمة المرور ----
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    showToast("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني", "success");
    return true;
  } catch (error) {
    let msg = "حدث خطأ";
    if (error.code === "auth/user-not-found") msg = "البريد الإلكتروني غير مسجل";
    if (error.code === "auth/invalid-email") msg = "صيغة البريد الإلكتروني غير صحيحة";
    showToast(msg, "error");
    return false;
  }
}

// ---- التحقق من صلاحية Admin ----
async function isAdmin() {
  const user = auth.currentUser;
  if (!user) return false;
  const doc = await db.collection("users").doc(user.uid).get();
  return doc.exists && doc.data().role === "admin";
}

// ---- دالة Loading ----
function showLoading(show) {
  const btn = document.getElementById("login-btn");
  const btnText = document.getElementById("login-btn-text");
  const spinner = document.getElementById("login-spinner");
  if (btn) btn.disabled = show;
  if (btnText) btnText.style.display = show ? "none" : "inline";
  if (spinner) spinner.style.display = show ? "inline-block" : "none";
}

// ---- Toast Notifications ----
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icons = { success: "✓", error: "✕", info: "ℹ", warning: "⚠" };
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);
  return container;
}
