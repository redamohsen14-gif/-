// js/layout.js - توليد Layout المشترك

function renderLayout(pageTitle, pageSubtitle, activePage) {
  const sidebar = `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">🏅</div>
      <div class="sidebar-logo-text">
        <h2>مصنع الشلوي</h2>
        <span>نظام الإدارة المتكامل</span>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-section-title">الرئيسية</div>
      <ul class="sidebar-nav">
        <li>
          <a href="index.html" class="${activePage === 'home' ? 'active' : ''}">
            <span class="nav-icon">🏠</span>
            <span>الصفحة الرئيسية</span>
          </a>
        </li>
        <li>
          <a href="dashboard.html" class="${activePage === 'dashboard' ? 'active' : ''}">
            <span class="nav-icon">📊</span>
            <span>لوحة التحكم</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-section-title">إدارة المخزون</div>
      <ul class="sidebar-nav">
        <li>
          <a href="orders.html" class="${activePage === 'orders' ? 'active' : ''}">
            <span class="nav-icon">📋</span>
            <span>الطلبات</span>
          </a>
        </li>
        <li>
          <a href="products.html" class="${activePage === 'products' ? 'active' : ''}">
            <span class="nav-icon">💍</span>
            <span>المنتجات</span>
          </a>
        </li>
        <li>
          <a href="ingots.html" class="${activePage === 'ingots' ? 'active' : ''}">
            <span class="nav-icon">🥇</span>
            <span>السبائك</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-section-title">الأفراد</div>
      <ul class="sidebar-nav">
        <li>
          <a href="agents.html" class="${activePage === 'agents' ? 'active' : ''}">
            <span class="nav-icon">👤</span>
            <span>المندوبون</span>
          </a>
        </li>
        <li>
          <a href="users.html" class="${activePage === 'users' ? 'active' : ''}">
            <span class="nav-icon">👥</span>
            <span>المستخدمون</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar">
          <span id="user-avatar-text">م</span>
        </div>
        <div class="user-info">
          <div class="name" id="current-user-name">جاري التحميل...</div>
          <div class="role" id="current-user-role">مستخدم</div>
        </div>
        <button class="btn-signout" onclick="signOut()" title="تسجيل الخروج">⏻</button>
      </div>
    </div>
  </aside>`;

  const header = `
  <header class="header">
    <div style="display:flex;align-items:center;gap:12px;">
      <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
      <div>
        <div class="header-title">${pageTitle}</div>
        <div class="header-subtitle">${pageSubtitle}</div>
      </div>
    </div>
    <div class="header-actions">
      <span class="header-badge">🏅 الذهب</span>
    </div>
  </header>`;

  return { sidebar, header };
}

function injectLayout(pageTitle, pageSubtitle, activePage) {
  const { sidebar, header } = renderLayout(pageTitle, pageSubtitle, activePage);
  document.getElementById('sidebar-placeholder').innerHTML = sidebar;
  document.getElementById('header-placeholder').innerHTML = header;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// إغلاق السايدبار عند الضغط خارجه في الشاشات الصغيرة
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  if (!sidebar.contains(e.target) && !e.target.closest('.sidebar-toggle')) {
    sidebar.classList.remove('open');
  }
});
