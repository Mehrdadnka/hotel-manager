document.addEventListener("DOMContentLoaded", () => {
  const mainSection = document.querySelector("main");

  // کاربران و رزروها (برای شبیه‌سازی)
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function saveBookings() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  // صفحه اصلی
  function renderHomePage() {
    mainSection.innerHTML = `
      <h2>خوش آمدید</h2>
      <p>لطفاً وارد شوید یا از امکانات سیستم استفاده کنید.</p>
    `;
  }

  // صفحه ورود
  function renderLoginPage() {
    mainSection.innerHTML = `
      <h2>ورود به سیستم</h2>
      <form id="login-form">
        <label>نام کاربری: <input type="text" id="username" required></label>
        <label>رمز عبور: <input type="password" id="password" required></label>
        <button type="submit">ورود</button>
      </form>
    `;
    document.getElementById("login-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      if (username === "admin" && password === "1234") {
        alert("ورود موفقیت‌آمیز!");
        renderAdminDashboard();
      } else {
        alert("نام کاربری یا رمز عبور اشتباه است.");
      }
    });
  }

  // داشبورد ادمین
  function renderAdminDashboard() {
    mainSection.innerHTML = `
      <h2>داشبورد مدیریت</h2>
      <div class="dashboard">
        <button id="manage-users">مدیریت اعضا</button>
        <button id="manage-reports">مشاهده گزارش‌ها</button>
        <button id="manage-bookings">مدیریت رزروها</button>
      </div>
      <div id="dashboard-content"></div>
    `;
    document.getElementById("manage-users").addEventListener("click", renderUserManagementPage);
    document.getElementById("manage-reports").addEventListener("click", renderReportsPage);
    document.getElementById("manage-bookings").addEventListener("click", renderBookingManagementPage);
  }

  // مدیریت اعضا
  function renderUserManagementPage() {
    const dashboardContent = document.getElementById("dashboard-content");
    dashboardContent.innerHTML = `
      <h3>مدیریت اعضا</h3>
      <form id="add-user-form">
        <label>نام: <input type="text" id="user-name" required></label>
        <label>ایمیل: <input type="email" id="user-email" required></label>
        <button type="submit">افزودن</button>
      </form>
      <ul id="user-list"></ul>
    `;
    const userList = document.getElementById("user-list");

    function renderUserList() {
      userList.innerHTML = users
        .map(
          (user, index) => `
          <li>
            ${user.name} (${user.email})
            <button onclick="deleteUser(${index})">حذف</button>
          </li>`
        )
        .join("");
    }

    document.getElementById("add-user-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("user-name").value;
      const email = document.getElementById("user-email").value;
      users.push({ name, email });
      saveUsers();
      renderUserList();
      event.target.reset();
    });

    window.deleteUser = (index) => {
      users.splice(index, 1);
      saveUsers();
      renderUserList();
    };

    renderUserList();
  }

  // مدیریت گزارش‌ها
  function renderReportsPage() {
    const dashboardContent = document.getElementById("dashboard-content");
    dashboardContent.innerHTML = `
      <h3>گزارش‌ها</h3>
      <table>
        <thead>
          <tr>
            <th>نام مشتری</th>
            <th>شماره تماس</th>
            <th>اتاق</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody id="reports-table"></tbody>
      </table>
    `;
    const reportsTable = document.getElementById("reports-table");

    function renderReports() {
      reportsTable.innerHTML = bookings
        .map(
          (booking, index) => `
          <tr>
            <td>${booking.customerName}</td>
            <td>${booking.phone}</td>
            <td>${booking.room}</td>
            <td>
              <button onclick="editBooking(${index})">ویرایش</button>
              <button onclick="deleteBooking(${index})">حذف</button>
            </td>
          </tr>`
        )
        .join("");
    }

    window.editBooking = (index) => {
      const booking = bookings[index];
      alert(`رزرو ${booking.customerName} قابل ویرایش است!`);
    };

    window.deleteBooking = (index) => {
      bookings.splice(index, 1);
      saveBookings();
      renderReports();
    };

    renderReports();
  }

  // مدیریت رزروها
  function renderBookingManagementPage() {
    const dashboardContent = document.getElementById("dashboard-content");
    dashboardContent.innerHTML = `
      <h3>مدیریت رزروها</h3>
      <form id="add-booking-form">
        <label>نام مشتری: <input type="text" id="customer-name" required></label>
        <label>اتاق: <input type="number" id="room-number" required></label>
        <button type="submit">افزودن</button>
      </form>
      <ul id="booking-list"></ul>
    `;
    const bookingList = document.getElementById("booking-list");

    function renderBookingList() {
      bookingList.innerHTML = bookings
        .map(
          (booking, index) => `
          <li>
            ${booking.customerName} (اتاق: ${booking.room})
            <button onclick="deleteBooking(${index})">حذف</button>
          </li>`
        )
        .join("");
    }

    document.getElementById("add-booking-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const customerName = document.getElementById("customer-name").value;
      const room = document.getElementById("room-number").value;
      bookings.push({ customerName, room });
      saveBookings();
      renderBookingList();
      event.target.reset();
    });

    window.deleteBooking = (index) => {
      bookings.splice(index, 1);
      saveBookings();
      renderBookingList();
    };

    renderBookingList();
  }

  // مسیریابی لینک‌ها
  document.getElementById("home-link").addEventListener("click", renderHomePage);
  document.getElementById("login-link").addEventListener("click", renderLoginPage);

  renderHomePage();
});