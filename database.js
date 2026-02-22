// ==========================================
// js/database.js - عمليات قاعدة البيانات
// ==========================================

const DB = {

  // ==========================================
  // ORDERS - الطلبات
  // ==========================================
  orders: {
    async add(data) {
      try {
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        data.createdBy = auth.currentUser?.uid || null;
        const ref = await db.collection("orders").add(data);
        showToast("تم إضافة الطلب بنجاح", "success");
        return { success: true, id: ref.id };
      } catch (e) { showToast("خطأ في إضافة الطلب", "error"); return { success: false, error: e }; }
    },
    async update(id, data) {
      try {
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("orders").doc(id).update(data);
        showToast("تم تحديث الطلب بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في تحديث الطلب", "error"); return { success: false, error: e }; }
    },
    async delete(id) {
      try {
        await db.collection("orders").doc(id).delete();
        showToast("تم حذف الطلب بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في حذف الطلب", "error"); return { success: false, error: e }; }
    },
    async getById(id) {
      try {
        const doc = await db.collection("orders").doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      } catch (e) { return null; }
    },
    async getAll(orderByField = "createdAt", direction = "desc") {
      try {
        const snap = await db.collection("orders").orderBy(orderByField, direction).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async search(field, value) {
      try {
        const snap = await db.collection("orders").where(field, "==", value).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async count() {
      try {
        const snap = await db.collection("orders").get();
        return snap.size;
      } catch (e) { return 0; }
    },
    async getLast(limit = 10) {
      try {
        const snap = await db.collection("orders").orderBy("createdAt", "desc").limit(limit).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    }
  },

  // ==========================================
  // PRODUCTS - المنتجات
  // ==========================================
  products: {
    async add(data) {
      try {
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        data.createdBy = auth.currentUser?.uid || null;
        const ref = await db.collection("products").add(data);
        showToast("تم إضافة المنتج بنجاح", "success");
        return { success: true, id: ref.id };
      } catch (e) { showToast("خطأ في إضافة المنتج", "error"); return { success: false, error: e }; }
    },
    async update(id, data) {
      try {
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("products").doc(id).update(data);
        showToast("تم تحديث المنتج بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في تحديث المنتج", "error"); return { success: false, error: e }; }
    },
    async delete(id) {
      try {
        await db.collection("products").doc(id).delete();
        showToast("تم حذف المنتج بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في حذف المنتج", "error"); return { success: false, error: e }; }
    },
    async getById(id) {
      try {
        const doc = await db.collection("products").doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      } catch (e) { return null; }
    },
    async getAll(orderByField = "createdAt", direction = "desc") {
      try {
        const snap = await db.collection("products").orderBy(orderByField, direction).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async search(field, value) {
      try {
        const snap = await db.collection("products").where(field, "==", value).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async count() {
      try {
        const snap = await db.collection("products").get();
        return snap.size;
      } catch (e) { return 0; }
    }
  },

  // ==========================================
  // INGOTS - السبائك
  // ==========================================
  ingots: {
    async add(data) {
      try {
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        data.createdBy = auth.currentUser?.uid || null;
        const ref = await db.collection("ingots").add(data);
        showToast("تم إضافة السبيكة بنجاح", "success");
        return { success: true, id: ref.id };
      } catch (e) { showToast("خطأ في إضافة السبيكة", "error"); return { success: false, error: e }; }
    },
    async update(id, data) {
      try {
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("ingots").doc(id).update(data);
        showToast("تم تحديث السبيكة بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في تحديث السبيكة", "error"); return { success: false, error: e }; }
    },
    async delete(id) {
      try {
        await db.collection("ingots").doc(id).delete();
        showToast("تم حذف السبيكة بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في حذف السبيكة", "error"); return { success: false, error: e }; }
    },
    async getById(id) {
      try {
        const doc = await db.collection("ingots").doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      } catch (e) { return null; }
    },
    async getAll(orderByField = "createdAt", direction = "desc") {
      try {
        const snap = await db.collection("ingots").orderBy(orderByField, direction).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async search(field, value) {
      try {
        const snap = await db.collection("ingots").where(field, "==", value).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async count() {
      try {
        const snap = await db.collection("ingots").get();
        return snap.size;
      } catch (e) { return 0; }
    }
  },

  // ==========================================
  // AGENTS - المندوبون
  // ==========================================
  agents: {
    async add(data) {
      try {
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        data.createdBy = auth.currentUser?.uid || null;
        const ref = await db.collection("agents").add(data);
        showToast("تم إضافة المندوب بنجاح", "success");
        return { success: true, id: ref.id };
      } catch (e) { showToast("خطأ في إضافة المندوب", "error"); return { success: false, error: e }; }
    },
    async update(id, data) {
      try {
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("agents").doc(id).update(data);
        showToast("تم تحديث المندوب بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في تحديث المندوب", "error"); return { success: false, error: e }; }
    },
    async delete(id) {
      try {
        await db.collection("agents").doc(id).delete();
        showToast("تم حذف المندوب بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في حذف المندوب", "error"); return { success: false, error: e }; }
    },
    async getById(id) {
      try {
        const doc = await db.collection("agents").doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      } catch (e) { return null; }
    },
    async getAll(orderByField = "createdAt", direction = "desc") {
      try {
        const snap = await db.collection("agents").orderBy(orderByField, direction).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async search(field, value) {
      try {
        const snap = await db.collection("agents").where(field, "==", value).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async count() {
      try {
        const snap = await db.collection("agents").get();
        return snap.size;
      } catch (e) { return 0; }
    }
  },

  // ==========================================
  // USERS - المستخدمون
  // ==========================================
  users: {
    async add(uid, data) {
      try {
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("users").doc(uid).set(data);
        return { success: true };
      } catch (e) { return { success: false, error: e }; }
    },
    async update(id, data) {
      try {
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection("users").doc(id).update(data);
        showToast("تم تحديث المستخدم بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في تحديث المستخدم", "error"); return { success: false, error: e }; }
    },
    async delete(id) {
      try {
        await db.collection("users").doc(id).delete();
        showToast("تم حذف المستخدم بنجاح", "success");
        return { success: true };
      } catch (e) { showToast("خطأ في حذف المستخدم", "error"); return { success: false, error: e }; }
    },
    async getById(id) {
      try {
        const doc = await db.collection("users").doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      } catch (e) { return null; }
    },
    async getAll() {
      try {
        const snap = await db.collection("users").orderBy("createdAt", "desc").get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async search(field, value) {
      try {
        const snap = await db.collection("users").where(field, "==", value).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) { return []; }
    },
    async count() {
      try {
        const snap = await db.collection("users").get();
        return snap.size;
      } catch (e) { return 0; }
    }
  }
};

// ==========================================
// دوال مساعدة عامة
// ==========================================

// تنسيق التاريخ
function formatDate(timestamp) {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  }).format(date);
}

// تنسيق الأرقام
function formatNumber(num) {
  return new Intl.NumberFormat("ar-SA").format(num || 0);
}

// توليد ID فريد
function generateId() {
  return db.collection("_").doc().id;
}
