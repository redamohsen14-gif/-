# 🏅 مصنع الشلوي للذهب — نظام إدارة المصنع المتكامل

## 📁 هيكل المشروع

```
gold-factory/
├── index.html          → الصفحة الرئيسية
├── login.html          → صفحة تسجيل الدخول
├── dashboard.html      → لوحة التحكم
├── orders.html         → إدارة الطلبات
├── products.html       → إدارة المنتجات
├── ingots.html         → إدارة السبائك
├── agents.html         → إدارة المندوبين
├── users.html          → إدارة المستخدمين
├── css/
│   └── style.css       → التصميم الكامل
└── js/
    ├── firebase.js     → إعداد Firebase
    ├── auth.js         → نظام المصادقة
    ├── database.js     → عمليات Firestore
    └── layout.js       → Layout المشترك
```

---

## ⚙️ خطوات الإعداد

### 1. إنشاء مشروع Firebase

1. اذهب إلى [console.firebase.google.com](https://console.firebase.google.com)
2. أنشئ مشروعاً جديداً
3. فعّل **Firebase Authentication** (Email/Password)
4. أنشئ قاعدة بيانات **Firestore** (ابدأ في وضع الاختبار)

### 2. تعديل `js/firebase.js`

استبدل القيم التجريبية ببيانات مشروعك:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. قواعد Firestore Security Rules

انسخ هذه القواعد في Firestore Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // مستخدم مسجل دخوله فقط يمكنه القراءة
    match /orders/{id} {
      allow read, write: if request.auth != null;
    }
    match /products/{id} {
      allow read, write: if request.auth != null;
    }
    match /ingots/{id} {
      allow read, write: if request.auth != null;
    }
    match /agents/{id} {
      allow read, write: if request.auth != null;
    }
    
    // ملفات المستخدمين
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.uid == userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

### 4. إنشاء أول مدير (Admin)

في Firebase Console → Authentication → أضف مستخدماً يدوياً، ثم:
- اذهب إلى Firestore → مجموعة `users` → أضف وثيقة بـ uid المستخدم:
```json
{
  "name": "المدير",
  "email": "admin@example.com",
  "role": "admin",
  "isActive": true
}
```

### 5. الرفع على GitHub Pages

1. ارفع المجلد على GitHub repository
2. اذهب إلى Settings → Pages → اختر main branch
3. سيعمل الموقع على: `https://yourusername.github.io/repository-name/`

### 5. الرفع على Netlify

1. اسحب المجلد إلى [netlify.com](https://netlify.com)
2. سيعمل فوراً بدون أي إعداد إضافي

---

## 📊 مجموعات Firestore

| المجموعة | الوصف | الحقول الرئيسية |
|---------|-------|----------------|
| `orders` | الطلبات | clientName, productName, weight, value, status |
| `products` | المنتجات | name, karat, weight, price, stock, category |
| `ingots` | السبائك | serialNumber, karat, weight, purchasePrice, supplier, status |
| `agents` | المندوبون | name, phone, email, region, commission, status |
| `users` | المستخدمون | name, email, role, isActive, lastLogin |

---

## 🔐 الصلاحيات

| الصلاحية | الوصول |
|---------|--------|
| `admin` | كامل الصفحات بما فيها إنشاء مستخدمين |
| `user` | كافة الصفحات عدا إنشاء مستخدمين |

---

## 🎨 التقنيات المستخدمة

- **Firebase Auth** — تسجيل دخول وحماية الصفحات
- **Firebase Firestore** — قاعدة البيانات
- **HTML5 + CSS3 + Vanilla JS** — واجهة المستخدم
- **Tajawal Font** — خط عربي احترافي
- **Dark Gold Theme** — تصميم ذهبي داكن احترافي
