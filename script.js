// Data aplikasi
let transactions = [];
let budgets = [];
let targets = [];
let categories = {
  income: ["Gaji", "Bonus", "Investasi", "Freelance", "Lainnya"],
  expense: [
    "Makanan & Minuman",
    "Transportasi",
    "Perumahan",
    "Hiburan",
    "Kesehatan",
    "Pendidikan",
    "Belanja",
    "Tabungan",
    "Lainnya",
  ],
};

// Chart instances
let financeTrendChart, expenseChart, incomeExpenseChart, categoryTrendChart;

// Inisialisasi data
function initializeData() {
  const savedTransactions = localStorage.getItem("fintrack_transactions");
  const savedBudgets = localStorage.getItem("fintrack_budgets");
  const savedTargets = localStorage.getItem("fintrack_targets");

  if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
  } else {
    // Data contoh
    transactions = [
      {
        id: 1,
        type: "income",
        category: "Gaji",
        amount: 10000000,
        description: "Gaji Januari 2026",
        date: "2026-01-05",
      },
      {
        id: 2,
        type: "expense",
        category: "Perumahan",
        amount: 2500000,
        description: "Bayar Kontrakan",
        date: "2026-01-10",
      },
      {
        id: 3,
        type: "expense",
        category: "Makanan & Minuman",
        amount: 1500000,
        description: "Belanja Bulanan",
        date: "2026-01-12",
      },
      {
        id: 4,
        type: "income",
        category: "Freelance",
        amount: 3000000,
        description: "Proyek Desain Website",
        date: "2026-01-15",
      },
      {
        id: 5,
        type: "expense",
        category: "Transportasi",
        amount: 500000,
        description: "Bensin & Parkir",
        date: "2026-01-18",
      },
      {
        id: 6,
        type: "expense",
        category: "Hiburan",
        amount: 750000,
        description: "Nonton Bioskop & Makan",
        date: "2026-01-20",
      },
      {
        id: 7,
        type: "expense",
        category: "Kesehatan",
        amount: 300000,
        description: "Check-up Dokter",
        date: "2026-01-22",
      },
      {
        id: 8,
        type: "income",
        category: "Bonus",
        amount: 2000000,
        description: "Bonus Tahunan",
        date: "2026-01-25",
      },
      {
        id: 9,
        type: "expense",
        category: "Tabungan",
        amount: 2000000,
        description: "Tabungan Bulanan",
        date: "2026-01-28",
      },
    ];
    saveTransactions();
  }

  if (savedBudgets) {
    budgets = JSON.parse(savedBudgets);
  } else {
    budgets = [
      { id: 1, category: "Makanan & Minuman", amount: 2000000, period: "monthly", spent: 1500000 },
      { id: 2, category: "Transportasi", amount: 1000000, period: "monthly", spent: 500000 },
      { id: 3, category: "Perumahan", amount: 3000000, period: "monthly", spent: 2500000 },
      { id: 4, category: "Hiburan", amount: 1000000, period: "monthly", spent: 750000 },
      { id: 5, category: "Kesehatan", amount: 500000, period: "monthly", spent: 300000 },
      { id: 6, category: "Tabungan", amount: 3000000, period: "monthly", spent: 2000000 },
    ];
    saveBudgets();
  }

  if (savedTargets) {
    targets = JSON.parse(savedTargets);
  } else {
    targets = [
      {
        id: 1,
        name: "Dana Darurat",
        amount: 30000000,
        saved: 15000000,
        deadline: "2026-12-31",
        category: "emergency",
      },
      {
        id: 2,
        name: "Liburan ke Bali",
        amount: 10000000,
        saved: 3500000,
        deadline: "2026-06-30",
        category: "vacation",
      },
      {
        id: 3,
        name: "DP Motor Listrik",
        amount: 15000000,
        saved: 7000000,
        deadline: "2026-09-30",
        category: "vehicle",
      },
    ];
    saveTargets();
  }
}

// Save functions
function saveTransactions() {
  localStorage.setItem("fintrack_transactions", JSON.stringify(transactions));
}

function saveBudgets() {
  localStorage.setItem("fintrack_budgets", JSON.stringify(budgets));
}

function saveTargets() {
  localStorage.setItem("fintrack_targets", JSON.stringify(targets));
}

// Save all data
function saveAllData() {
  saveTransactions();
  saveBudgets();
  saveTargets();
}

// Format functions
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

function formatShortDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

// Navigation - DIUBAH untuk support footer links
function setupNavigation() {
  const navLinks = document.querySelectorAll("nav a, .nav-link-footer");
  const sections = document.querySelectorAll(".section");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get target section ID
      const targetId = this.getAttribute("href").substring(1);

      // Update all navigation
      updateAllNavigation(targetId);

      // Update active section
      updateActiveSection(targetId);

      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
}

// Update all navigation (header + footer)
function updateAllNavigation(activeSectionId) {
  // Update header navigation
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${activeSectionId}`) {
      link.classList.add("active");
    }
  });

  // Update footer navigation
  const footerLinks = document.querySelectorAll(".nav-link-footer");
  footerLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${activeSectionId}`) {
      link.classList.add("active");
    }
  });

  // Update sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
    if (section.id === activeSectionId) {
      section.classList.add("active");
    }
  });
}

// Update active section
function updateActiveSection(sectionId) {
  switch (sectionId) {
    case "dashboard":
      updateDashboard();
      break;
    case "transaksi":
      updateTransactionsList();
      updateTransactionFilters();
      break;
    case "anggaran":
      updateBudgetsList();
      updateBudgetProgress();
      break;
    case "laporan":
      updateReports();
      break;
    case "target":
      updateTargetsList();
      updateTargetProgress();
      break;
  }
}

// Dashboard functions
function updateDashboard() {
  updateFinancialSummary();
  updateRecentTransactions();
  updateCharts();
}

function updateFinancialSummary() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let monthIncome = 0;
  let monthExpense = 0;

  // Hitung pemasukan dan pengeluaran bulan ini
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    ) {
      if (transaction.type === "income") {
        monthIncome += transaction.amount;
      } else {
        monthExpense += transaction.amount;
      }
    }
  });

  // Hitung total semua transaksi
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  const currentBalance = totalIncome - totalExpense;

  // Hitung tabungan (dari kategori Tabungan)
  let totalSavings = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "expense" && transaction.category === "Tabungan") {
      totalSavings += transaction.amount;
    }
  });

  // Update UI
  document.getElementById("current-balance").textContent = formatRupiah(currentBalance);
  document.getElementById("month-expense").textContent = formatRupiah(monthExpense);
  document.getElementById("month-income").textContent = formatRupiah(monthIncome);
  document.getElementById("total-savings").textContent = formatRupiah(totalSavings);

  // Update current date
  document.querySelector(".current-date").textContent = formatDate(new Date());
}

function updateRecentTransactions() {
  const recentTransactionsList = document.getElementById("recent-transactions-list");

  // Sort by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentTransactions = sortedTransactions.slice(0, 5);

  recentTransactionsList.innerHTML = "";

  if (recentTransactions.length === 0) {
    recentTransactionsList.innerHTML = '<div class="no-data">Belum ada transaksi</div>';
    return;
  }

  recentTransactions.forEach((transaction) => {
    const transactionItem = document.createElement("div");
    transactionItem.className = "transaction-item";

    const transactionInfo = document.createElement("div");
    transactionInfo.className = "transaction-info";

    const description = document.createElement("div");
    description.className = "transaction-description";
    description.textContent = transaction.description;

    const category = document.createElement("div");
    category.className = "transaction-category";
    category.innerHTML = `<i class="fas fa-tag"></i> ${transaction.category}`;

    transactionInfo.appendChild(description);
    transactionInfo.appendChild(category);

    const amount = document.createElement("div");
    amount.className = `transaction-amount ${transaction.type}`;
    amount.textContent =
      transaction.type === "income"
        ? `+ ${formatRupiah(transaction.amount)}`
        : `- ${formatRupiah(transaction.amount)}`;

    const date = document.createElement("div");
    date.className = "transaction-date";
    date.textContent = formatShortDate(transaction.date);

    transactionItem.appendChild(transactionInfo);
    transactionItem.appendChild(amount);
    transactionItem.appendChild(date);

    recentTransactionsList.appendChild(transactionItem);
  });
}

// Charts
function updateCharts() {
  // Data for 6 months trend
  const months = [];
  const incomeData = [];
  const expenseData = [];

  const currentDate = new Date();

  // Get data for last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = date.toLocaleDateString("id-ID", { month: "short" });
    months.push(monthName);

    let monthIncome = 0;
    let monthExpense = 0;

    // Calculate income and expense for this month
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear()
      ) {
        if (transaction.type === "income") {
          monthIncome += transaction.amount;
        } else {
          monthExpense += transaction.amount;
        }
      }
    });

    incomeData.push(monthIncome);
    expenseData.push(monthExpense);
  }

  // Finance Trend Chart
  const trendCtx = document.getElementById("financeTrendChart").getContext("2d");

  if (financeTrendChart) {
    financeTrendChart.destroy();
  }

  financeTrendChart = new Chart(trendCtx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Pemasukan",
          data: incomeData,
          borderColor: "#28a745",
          backgroundColor: "rgba(40, 167, 69, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Pengeluaran",
          data: expenseData,
          borderColor: "#dc3545",
          backgroundColor: "rgba(220, 53, 69, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatRupiah(value);
            },
          },
        },
      },
    },
  });

  // Expense Distribution Chart
  const expenseCategories = {};

  // Calculate expenses by category
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      if (expenseCategories[transaction.category]) {
        expenseCategories[transaction.category] += transaction.amount;
      } else {
        expenseCategories[transaction.category] = transaction.amount;
      }
    }
  });

  const categoryLabels = Object.keys(expenseCategories);
  const categoryData = Object.values(expenseCategories);

  const backgroundColors = [
    "#4361ee",
    "#3a0ca3",
    "#4cc9f0",
    "#f8961e",
    "#f72585",
    "#7209b7",
    "#4895ef",
    "#b5179e",
    "#560bad",
    "#3f37c9",
  ];

  const expenseCtx = document.getElementById("expenseChart").getContext("2d");

  if (expenseChart) {
    expenseChart.destroy();
  }

  if (categoryLabels.length === 0) {
    expenseCtx.font = "16px Arial";
    expenseCtx.fillStyle = "#666";
    expenseCtx.textAlign = "center";
    expenseCtx.fillText(
      "Tidak ada data pengeluaran",
      expenseCtx.canvas.width / 2,
      expenseCtx.canvas.height / 2
    );
    return;
  }

  expenseChart = new Chart(expenseCtx, {
    type: "doughnut",
    data: {
      labels: categoryLabels,
      datasets: [
        {
          data: categoryData,
          backgroundColor: backgroundColors.slice(0, categoryLabels.length),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.raw;
              const total = categoryData.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${context.label}: ${formatRupiah(value)} (${percentage}%)`;
            },
          },
        },
      },
    },
  });
}

// Transaction functions
function setupTransactionForm() {
  const addTransactionBtn = document.getElementById("add-transaction-btn");
  const transactionForm = document.getElementById("transaction-form");
  const cancelTransactionBtn = document.getElementById("cancel-transaction-btn");
  const newTransactionForm = document.getElementById("new-transaction-form");
  const transactionType = document.getElementById("transaction-type");
  const transactionCategory = document.getElementById("transaction-category");

  addTransactionBtn.addEventListener("click", function () {
    transactionForm.classList.add("active");
    // Set default date to today
    document.getElementById("transaction-date").valueAsDate = new Date();

    // Reset form
    newTransactionForm.reset();

    // Update category options based on default type
    updateCategoryOptions(transactionType.value, transactionCategory);
  });

  cancelTransactionBtn.addEventListener("click", function () {
    transactionForm.classList.remove("active");
    newTransactionForm.reset();
  });

  transactionType.addEventListener("change", function () {
    const type = this.value;
    updateCategoryOptions(type, transactionCategory);
  });

  newTransactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const type = document.getElementById("transaction-type").value;
    const category = document.getElementById("transaction-category").value;
    const amount = parseInt(document.getElementById("transaction-amount").value);
    const description = document.getElementById("transaction-description").value;
    const date = document.getElementById("transaction-date").value;

    // Validate
    if (!type || !category || !amount || amount <= 0 || !description || !date) {
      showToast("Harap isi semua field dengan benar!");
      return;
    }

    // Create new ID
    const newId = transactions.length > 0 ? Math.max(...transactions.map((t) => t.id)) + 1 : 1;

    // Create new transaction
    const newTransaction = {
      id: newId,
      type: type,
      category: category,
      amount: amount,
      description: description,
      date: date,
    };

    // Add to transactions array
    transactions.push(newTransaction);
    saveTransactions();

    // Update budgets spent amount
    updateBudgetSpent(category, amount, type);

    // Hide form and reset
    transactionForm.classList.remove("active");
    newTransactionForm.reset();

    // Update UI
    updateActiveSection("dashboard");
    updateActiveSection("transaksi");

    // Show success message
    showToast("Transaksi berhasil ditambahkan!");
  });
}

function updateCategoryOptions(type, selectElement) {
  // Clear current options
  selectElement.innerHTML = '<option value="">Pilih Kategori</option>';

  // Add options based on transaction type
  const categoryList = categories[type] || [];
  categoryList.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    selectElement.appendChild(option);
  });
}

function updateTransactionFilters() {
  const filterCategory = document.getElementById("filter-category");

  // Clear and add "All Categories" option
  filterCategory.innerHTML = '<option value="all">Semua Kategori</option>';

  // Get all unique categories from transactions
  const allCategories = [...categories.income, ...categories.expense];
  const uniqueCategories = [...new Set(allCategories)];

  // Add each category as an option
  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterCategory.appendChild(option);
  });

  // Setup month filter
  const filterMonth = document.getElementById("filter-month");
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const currentDate = new Date();
  // Add last 6 months
  for (let i = 0; i < 6; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    const option = document.createElement("option");
    option.value = `${date.getMonth() + 1}-${year}`;
    option.textContent = `${monthName} ${year}`;
    filterMonth.appendChild(option);
  }

  // Setup filter event listeners
  const filterType = document.getElementById("filter-type");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");

  filterType.addEventListener("change", updateTransactionsList);
  filterCategory.addEventListener("change", updateTransactionsList);
  filterMonth.addEventListener("change", updateTransactionsList);

  resetFiltersBtn.addEventListener("click", function () {
    filterType.value = "all";
    filterCategory.value = "all";
    filterMonth.value = "all";
    updateTransactionsList();
  });
}

function updateTransactionsList() {
  const filterType = document.getElementById("filter-type").value;
  const filterCategory = document.getElementById("filter-category").value;
  const filterMonth = document.getElementById("filter-month").value;

  // Start with all transactions
  let filteredTransactions = [...transactions];

  // Apply filters
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter((t) => t.type === filterType);
  }

  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter((t) => t.category === filterCategory);
  }

  if (filterMonth !== "all") {
    const [month, year] = filterMonth.split("-").map(Number);
    filteredTransactions = filteredTransactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() + 1 === month && transactionDate.getFullYear() === year;
    });
  }

  // Sort by date (newest first)
  filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Update transactions table
  const transactionsList = document.getElementById("transactions-list");
  transactionsList.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  if (filteredTransactions.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "Tidak ada transaksi yang sesuai dengan filter";
    cell.style.textAlign = "center";
    cell.style.padding = "20px";
    cell.style.color = "var(--gray)";
    row.appendChild(cell);
    transactionsList.appendChild(row);
  } else {
    filteredTransactions.forEach((transaction) => {
      const row = document.createElement("tr");

      // Date
      const dateCell = document.createElement("td");
      dateCell.textContent = formatShortDate(transaction.date);

      // Description
      const descCell = document.createElement("td");
      descCell.textContent = transaction.description;

      // Category
      const categoryCell = document.createElement("td");
      categoryCell.textContent = transaction.category;

      // Type
      const typeCell = document.createElement("td");
      const typeBadge = document.createElement("span");
      typeBadge.className = `transaction-type ${transaction.type}`;
      typeBadge.textContent = transaction.type === "income" ? "Pemasukan" : "Pengeluaran";
      typeCell.appendChild(typeBadge);

      // Amount
      const amountCell = document.createElement("td");
      amountCell.textContent = formatRupiah(transaction.amount);
      amountCell.style.color = transaction.type === "income" ? "#28a745" : "#dc3545";
      amountCell.style.fontWeight = "600";

      // Actions
      const actionCell = document.createElement("td");
      const actionButtons = document.createElement("div");
      actionButtons.className = "action-buttons";

      const editBtn = document.createElement("button");
      editBtn.className = "action-btn edit-btn";
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.title = "Edit transaksi";
      editBtn.addEventListener("click", function () {
        editTransaction(transaction.id);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "action-btn delete-btn";
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.title = "Hapus transaksi";
      deleteBtn.addEventListener("click", function () {
        showDeleteModal(
          "transaksi",
          transaction.id,
          `${transaction.description} - ${formatRupiah(transaction.amount)}`
        );
      });

      actionButtons.appendChild(editBtn);
      actionButtons.appendChild(deleteBtn);
      actionCell.appendChild(actionButtons);

      row.appendChild(dateCell);
      row.appendChild(descCell);
      row.appendChild(categoryCell);
      row.appendChild(typeCell);
      row.appendChild(amountCell);
      row.appendChild(actionCell);

      transactionsList.appendChild(row);

      // Calculate totals
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
  }

  // Update summary
  document.getElementById("total-income").textContent = formatRupiah(totalIncome);
  document.getElementById("total-expense").textContent = formatRupiah(totalExpense);
  document.getElementById("transaction-balance").textContent = formatRupiah(
    totalIncome - totalExpense
  );
}

function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) return;

  // Show transaction form
  const transactionForm = document.getElementById("transaction-form");
  transactionForm.classList.add("active");

  // Fill form with transaction data
  document.getElementById("transaction-type").value = transaction.type;

  // Update category options based on type
  const transactionCategory = document.getElementById("transaction-category");
  updateCategoryOptions(transaction.type, transactionCategory);

  // Set values after options are updated
  setTimeout(() => {
    document.getElementById("transaction-category").value = transaction.category;
    document.getElementById("transaction-amount").value = transaction.amount;
    document.getElementById("transaction-description").value = transaction.description;
    document.getElementById("transaction-date").value = transaction.date;

    // Temporarily change form submit handler for edit
    const form = document.getElementById("new-transaction-form");
    const originalHandler = form.onsubmit;

    form.onsubmit = function (e) {
      e.preventDefault();

      // Update transaction
      transaction.type = document.getElementById("transaction-type").value;
      transaction.category = document.getElementById("transaction-category").value;
      transaction.amount = parseInt(document.getElementById("transaction-amount").value);
      transaction.description = document.getElementById("transaction-description").value;
      transaction.date = document.getElementById("transaction-date").value;

      // Save changes
      saveTransactions();

      // Update budgets if category or amount changed
      updateAllBudgetsSpent();

      // Hide form and reset
      transactionForm.classList.remove("active");
      form.reset();

      // Update UI
      updateActiveSection("dashboard");
      updateActiveSection("transaksi");

      // Restore original handler
      form.onsubmit = originalHandler;

      // Show success message
      showToast("Transaksi berhasil diperbarui!");
    };
  }, 100);
}

// Budget functions
function setupBudgetForm() {
  const addBudgetBtn = document.getElementById("add-budget-btn");
  const budgetForm = document.getElementById("budget-form");
  const cancelBudgetBtn = document.getElementById("cancel-budget-btn");
  const newBudgetForm = document.getElementById("new-budget-form");
  const budgetCategory = document.getElementById("budget-category");

  // Add expense categories to budget category dropdown
  categories.expense.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    budgetCategory.appendChild(option);
  });

  addBudgetBtn.addEventListener("click", function () {
    budgetForm.classList.add("active");
  });

  cancelBudgetBtn.addEventListener("click", function () {
    budgetForm.classList.remove("active");
    newBudgetForm.reset();
  });

  newBudgetForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const category = document.getElementById("budget-category").value;
    const amount = parseInt(document.getElementById("budget-amount").value);
    const period = document.getElementById("budget-period").value;

    // Validate
    if (!category || !amount || amount <= 0 || !period) {
      showToast("Harap isi semua field dengan benar!");
      return;
    }

    // Check if budget for this category and period already exists
    const existingBudget = budgets.find((b) => b.category === category && b.period === period);

    if (existingBudget) {
      showToast("Anggaran untuk kategori ini sudah ada. Silakan edit anggaran yang sudah ada.");
      return;
    }

    // Calculate spent amount for this category
    const currentDate = new Date();
    let spent = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "expense" && transaction.category === category) {
        const transactionDate = new Date(transaction.date);

        if (period === "monthly") {
          // Monthly: count expenses from current month
          if (
            transactionDate.getMonth() === currentDate.getMonth() &&
            transactionDate.getFullYear() === currentDate.getFullYear()
          ) {
            spent += transaction.amount;
          }
        } else if (period === "yearly") {
          // Yearly: count expenses from current year
          if (transactionDate.getFullYear() === currentDate.getFullYear()) {
            spent += transaction.amount;
          }
        }
      }
    });

    // Create new ID
    const newId = budgets.length > 0 ? Math.max(...budgets.map((b) => b.id)) + 1 : 1;

    // Create new budget
    const newBudget = {
      id: newId,
      category: category,
      amount: amount,
      period: period,
      spent: spent,
    };

    // Add to budgets array
    budgets.push(newBudget);
    saveBudgets();

    // Hide form and reset
    budgetForm.classList.remove("active");
    newBudgetForm.reset();

    // Update UI
    updateActiveSection("anggaran");

    // Show success message
    showToast("Anggaran berhasil ditambahkan!");
  });
}

function updateBudgetsList() {
  const budgetsList = document.getElementById("budgets-list");
  budgetsList.innerHTML = "";

  // Filter monthly budgets for display
  const monthlyBudgets = budgets.filter((b) => b.period === "monthly");

  if (monthlyBudgets.length === 0) {
    budgetsList.innerHTML = '<div class="no-data">Belum ada anggaran yang ditambahkan</div>';
    return;
  }

  monthlyBudgets.forEach((budget) => {
    const budgetItem = document.createElement("div");
    budgetItem.className = "budget-item";

    const budgetHeader = document.createElement("div");
    budgetHeader.className = "budget-header";

    const category = document.createElement("div");
    category.className = "budget-category";
    category.textContent = budget.category;

    const amount = document.createElement("div");
    amount.className = "budget-amount";
    amount.textContent = formatRupiah(budget.amount);

    budgetHeader.appendChild(category);
    budgetHeader.appendChild(amount);

    // Action buttons container
    const actionContainer = document.createElement("div");
    actionContainer.className = "budget-actions";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "action-btn delete-btn";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = "Hapus anggaran";
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      showDeleteModal(
        "anggaran",
        budget.id,
        `Anggaran ${budget.category} - ${formatRupiah(budget.amount)}`
      );
    });

    actionContainer.appendChild(deleteBtn);
    budgetHeader.appendChild(actionContainer);

    const progressBar = document.createElement("div");
    progressBar.className = "budget-progress-bar";

    const progress = document.createElement("div");
    progress.className = "budget-progress";

    // Calculate percentage
    const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
    progress.style.width = `${percentage}%`;

    // Determine color based on percentage
    if (percentage < 70) {
      progress.classList.add("progress-safe");
    } else if (percentage < 90) {
      progress.classList.add("progress-warning");
    } else {
      progress.classList.add("progress-danger");
    }

    progressBar.appendChild(progress);

    const budgetDetails = document.createElement("div");
    budgetDetails.className = "budget-details";

    const spent = document.createElement("div");
    spent.textContent = `Terpakai: ${formatRupiah(budget.spent)}`;

    const remaining = document.createElement("div");
    const remainingAmount = budget.amount - budget.spent;
    remaining.textContent = `Sisa: ${formatRupiah(remainingAmount)}`;
    remaining.style.color = remainingAmount < 0 ? "#dc3545" : "#28a745";

    budgetDetails.appendChild(spent);
    budgetDetails.appendChild(remaining);

    budgetItem.appendChild(budgetHeader);
    budgetItem.appendChild(progressBar);
    budgetItem.appendChild(budgetDetails);

    budgetsList.appendChild(budgetItem);
  });
}

function updateBudgetProgress() {
  const budgetProgressContainer = document.getElementById("budget-progress-container");
  budgetProgressContainer.innerHTML = "";

  // Filter monthly budgets for display
  const monthlyBudgets = budgets.filter((b) => b.period === "monthly");

  monthlyBudgets.forEach((budget) => {
    const progressItem = document.createElement("div");
    progressItem.className = "budget-progress-item";

    const category = document.createElement("div");
    category.className = "progress-category";
    category.textContent = budget.category;

    const progressBar = document.createElement("div");
    progressBar.className = "budget-progress-bar";

    const progress = document.createElement("div");
    progress.className = "budget-progress";

    // Calculate percentage
    const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
    progress.style.width = `${percentage}%`;

    // Determine color based on percentage
    if (percentage < 70) {
      progress.classList.add("progress-safe");
    } else if (percentage < 90) {
      progress.classList.add("progress-warning");
    } else {
      progress.classList.add("progress-danger");
    }

    progressBar.appendChild(progress);

    const progressText = document.createElement("div");
    progressText.className = "progress-text";
    progressText.textContent = `${formatRupiah(budget.spent)} / ${formatRupiah(
      budget.amount
    )} (${percentage.toFixed(1)}%)`;

    progressItem.appendChild(category);
    progressItem.appendChild(progressBar);
    progressItem.appendChild(progressText);

    budgetProgressContainer.appendChild(progressItem);
  });
}

function updateBudgetSpent(category, amount, type) {
  // Only update for expenses
  if (type !== "expense") return;

  const currentDate = new Date();

  // Update monthly budgets
  budgets.forEach((budget) => {
    if (budget.category === category && budget.period === "monthly") {
      // Check if transaction is in current month
      // Note: In a real app, we would check the transaction date
      // For simplicity, we're updating based on current month
      budget.spent += amount;
    }
  });

  saveBudgets();
}

function updateAllBudgetsSpent() {
  const currentDate = new Date();

  // Reset all spent amounts
  budgets.forEach((budget) => {
    budget.spent = 0;
  });

  // Recalculate spent amounts from transactions
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      const transactionDate = new Date(transaction.date);

      budgets.forEach((budget) => {
        if (budget.category === transaction.category) {
          if (budget.period === "monthly") {
            if (
              transactionDate.getMonth() === currentDate.getMonth() &&
              transactionDate.getFullYear() === currentDate.getFullYear()
            ) {
              budget.spent += transaction.amount;
            }
          } else if (budget.period === "yearly") {
            if (transactionDate.getFullYear() === currentDate.getFullYear()) {
              budget.spent += transaction.amount;
            }
          }
        }
      });
    }
  });

  saveBudgets();
}

// Target functions
function setupTargetForm() {
  const addTargetBtn = document.getElementById("add-target-btn");
  const targetForm = document.getElementById("target-form");
  const cancelTargetBtn = document.getElementById("cancel-target-btn");
  const newTargetForm = document.getElementById("new-target-form");

  addTargetBtn.addEventListener("click", function () {
    targetForm.classList.add("active");
    // Set default date to 6 months from now
    const defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 6);
    document.getElementById("target-deadline").valueAsDate = defaultDate;
  });

  cancelTargetBtn.addEventListener("click", function () {
    targetForm.classList.remove("active");
    newTargetForm.reset();
  });

  newTargetForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("target-name").value;
    const amount = parseInt(document.getElementById("target-amount").value);
    const deadline = document.getElementById("target-deadline").value;
    const saved = parseInt(document.getElementById("target-saved").value);
    const category = document.getElementById("target-category").value;

    // Validate
    if (!name || !amount || amount <= 0 || !deadline || saved < 0 || !category) {
      showToast("Harap isi semua field dengan benar!");
      return;
    }

    if (saved > amount) {
      showToast("Jumlah yang sudah tersimpan tidak boleh lebih besar dari jumlah target.");
      return;
    }

    // Create new ID
    const newId = targets.length > 0 ? Math.max(...targets.map((t) => t.id)) + 1 : 1;

    // Create new target
    const newTarget = {
      id: newId,
      name: name,
      amount: amount,
      saved: saved,
      deadline: deadline,
      category: category,
    };

    // Add to targets array
    targets.push(newTarget);
    saveTargets();

    // Hide form and reset
    targetForm.classList.remove("active");
    newTargetForm.reset();

    // Update UI
    updateActiveSection("target");

    // Show success message
    showToast("Target berhasil ditambahkan!");
  });
}

function updateTargetsList() {
  const targetsList = document.getElementById("targets-list");
  targetsList.innerHTML = "";

  if (targets.length === 0) {
    targetsList.innerHTML = '<div class="no-data">Belum ada target yang ditambahkan</div>';
    return;
  }

  targets.forEach((target) => {
    const targetItem = document.createElement("div");
    targetItem.className = "target-item";

    const targetHeader = document.createElement("div");
    targetHeader.className = "target-header";

    const name = document.createElement("div");
    name.className = "target-name";
    name.textContent = target.name;

    const amount = document.createElement("div");
    amount.className = "target-amount";
    amount.textContent = formatRupiah(target.amount);

    targetHeader.appendChild(name);
    targetHeader.appendChild(amount);

    // Action buttons container
    const actionContainer = document.createElement("div");
    actionContainer.className = "target-actions";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "action-btn delete-btn";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = "Hapus target";
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      showDeleteModal(
        "target",
        target.id,
        `Target ${target.name} - ${formatRupiah(target.amount)}`
      );
    });

    actionContainer.appendChild(deleteBtn);
    targetHeader.appendChild(actionContainer);

    const progressBar = document.createElement("div");
    progressBar.className = "target-progress-bar";

    const progress = document.createElement("div");
    progress.className = "target-progress";

    // Calculate percentage
    const percentage = Math.min((target.saved / target.amount) * 100, 100);
    progress.style.width = `${percentage}%`;

    // Determine color based on percentage
    if (percentage < 50) {
      progress.classList.add("progress-danger");
    } else if (percentage < 80) {
      progress.classList.add("progress-warning");
    } else {
      progress.classList.add("progress-safe");
    }

    progressBar.appendChild(progress);

    const targetDetails = document.createElement("div");
    targetDetails.className = "target-details";

    const saved = document.createElement("div");
    saved.textContent = `Terkumpul: ${formatRupiah(target.saved)} (${percentage.toFixed(1)}%)`;

    const deadline = document.createElement("div");
    const deadlineDate = new Date(target.deadline);
    const now = new Date();
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      deadline.textContent = `Jatuh tempo: ${formatShortDate(target.deadline)} (terlewat ${Math.abs(
        diffDays
      )} hari)`;
      deadline.style.color = "#dc3545";
    } else {
      deadline.textContent = `Jatuh tempo: ${formatShortDate(
        target.deadline
      )} (${diffDays} hari lagi)`;
      deadline.style.color = diffDays < 30 ? "#f8961e" : "#28a745";
    }

    targetDetails.appendChild(saved);
    targetDetails.appendChild(deadline);

    targetItem.appendChild(targetHeader);
    targetItem.appendChild(progressBar);
    targetItem.appendChild(targetDetails);

    targetsList.appendChild(targetItem);
  });
}

function updateTargetProgress() {
  let totalTargetAmount = 0;
  let totalSavedAmount = 0;

  targets.forEach((target) => {
    totalTargetAmount += target.amount;
    totalSavedAmount += target.saved;
  });

  const totalRemainingAmount = totalTargetAmount - totalSavedAmount;
  const overallProgress =
    totalTargetAmount > 0 ? Math.round((totalSavedAmount / totalTargetAmount) * 100) : 0;

  document.getElementById("total-target-amount").textContent = formatRupiah(totalTargetAmount);
  document.getElementById("total-saved-amount").textContent = formatRupiah(totalSavedAmount);
  document.getElementById("total-remaining-amount").textContent =
    formatRupiah(totalRemainingAmount);
  document.getElementById("overall-progress").textContent = `${overallProgress}%`;
}

// Report functions
function updateReports() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let monthIncome = 0;
  let monthExpense = 0;
  let expenseByCategory = {};

  // Calculate income, expense, and expenses by category for current month
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    ) {
      if (transaction.type === "income") {
        monthIncome += transaction.amount;
      } else {
        monthExpense += transaction.amount;

        // Group expenses by category
        if (expenseByCategory[transaction.category]) {
          expenseByCategory[transaction.category] += transaction.amount;
        } else {
          expenseByCategory[transaction.category] = transaction.amount;
        }
      }
    }
  });

  // Find category with highest expense
  let topExpenseCategory = "-";
  let topExpenseAmount = 0;

  for (const [category, amount] of Object.entries(expenseByCategory)) {
    if (amount > topExpenseAmount) {
      topExpenseCategory = category;
      topExpenseAmount = amount;
    }
  }

  // Update report summary
  document.getElementById("report-income").textContent = formatRupiah(monthIncome);
  document.getElementById("report-expense").textContent = formatRupiah(monthExpense);
  document.getElementById("report-balance").textContent = formatRupiah(monthIncome - monthExpense);
  document.getElementById("top-expense-category").textContent = topExpenseCategory;
  document.getElementById("top-expense-amount").textContent = formatRupiah(topExpenseAmount);

  // Calculate changes from previous month
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let prevMonthIncome = 0;
  let prevMonthExpense = 0;

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transactionDate.getMonth() === prevMonth && transactionDate.getFullYear() === prevYear) {
      if (transaction.type === "income") {
        prevMonthIncome += transaction.amount;
      } else {
        prevMonthExpense += transaction.amount;
      }
    }
  });

  // Calculate percentage changes
  const incomeChange =
    prevMonthIncome === 0
      ? 100
      : Math.round(((monthIncome - prevMonthIncome) / prevMonthIncome) * 100);
  const expenseChange =
    prevMonthExpense === 0
      ? 100
      : Math.round(((monthExpense - prevMonthExpense) / prevMonthExpense) * 100);
  const balanceChange =
    prevMonthIncome - prevMonthExpense === 0
      ? 100
      : Math.round(
          ((monthIncome - monthExpense - (prevMonthIncome - prevMonthExpense)) /
            (prevMonthIncome - prevMonthExpense)) *
            100
        );

  document.getElementById("income-change").textContent = `${
    incomeChange >= 0 ? "+" : ""
  }${incomeChange}%`;
  document.getElementById("expense-change").textContent = `${
    expenseChange >= 0 ? "+" : ""
  }${expenseChange}%`;
  document.getElementById("balance-change").textContent = `${
    balanceChange >= 0 ? "+" : ""
  }${balanceChange}%`;

  // Update charts
  updateIncomeExpenseChart(monthIncome, monthExpense);
  updateCategoryTrendChart(expenseByCategory);

  // Update report details table
  updateReportDetails(monthIncome, monthExpense, expenseByCategory);
}

function updateIncomeExpenseChart(income, expense) {
  const ctx = document.getElementById("incomeExpenseChart").getContext("2d");

  if (incomeExpenseChart) {
    incomeExpenseChart.destroy();
  }

  incomeExpenseChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Pemasukan", "Pengeluaran"],
      datasets: [
        {
          label: "Jumlah (Rp)",
          data: [income, expense],
          backgroundColor: ["#28a745", "#dc3545"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatRupiah(value);
            },
          },
        },
      },
    },
  });
}

function updateCategoryTrendChart(expenseByCategory) {
  const ctx = document.getElementById("categoryTrendChart").getContext("2d");

  const categoryLabels = Object.keys(expenseByCategory);
  const categoryData = Object.values(expenseByCategory);

  const backgroundColors = [
    "#4361ee",
    "#3a0ca3",
    "#4cc9f0",
    "#f8961e",
    "#f72585",
    "#7209b7",
    "#4895ef",
    "#b5179e",
    "#560bad",
    "#3f37c9",
  ];

  if (categoryTrendChart) {
    categoryTrendChart.destroy();
  }

  if (categoryLabels.length === 0) {
    return;
  }

  categoryTrendChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: categoryLabels,
      datasets: [
        {
          label: "Pengeluaran per Kategori",
          data: categoryData,
          backgroundColor: backgroundColors.slice(0, categoryLabels.length),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatRupiah(value);
            },
          },
        },
      },
    },
  });
}

function updateReportDetails(income, expense, expenseByCategory) {
  const reportDetailsBody = document.getElementById("report-details-body");
  reportDetailsBody.innerHTML = "";

  // Income row
  const incomeRow = document.createElement("tr");

  const incomeCategory = document.createElement("td");
  incomeCategory.textContent = "Pemasukan";

  const incomeAmount = document.createElement("td");
  incomeAmount.textContent = formatRupiah(income);
  incomeAmount.style.fontWeight = "600";
  incomeAmount.style.color = "#28a745";

  const incomeExpenseCell = document.createElement("td");
  incomeExpenseCell.textContent = "-";

  const incomeBalance = document.createElement("td");
  incomeBalance.textContent = formatRupiah(income);
  incomeBalance.style.fontWeight = "600";

  const incomePercentage = document.createElement("td");
  const incomePercent = income > 0 ? 100 : 0;
  incomePercentage.textContent = `${incomePercent}%`;

  incomeRow.appendChild(incomeCategory);
  incomeRow.appendChild(incomeAmount);
  incomeRow.appendChild(incomeExpenseCell);
  incomeRow.appendChild(incomeBalance);
  incomeRow.appendChild(incomePercentage);

  reportDetailsBody.appendChild(incomeRow);

  // Expense rows by category
  for (const [category, amount] of Object.entries(expenseByCategory)) {
    const row = document.createElement("tr");

    const categoryCell = document.createElement("td");
    categoryCell.textContent = category;

    const incomeCell = document.createElement("td");
    incomeCell.textContent = "-";

    const expenseCell = document.createElement("td");
    expenseCell.textContent = formatRupiah(amount);
    expenseCell.style.fontWeight = "600";
    expenseCell.style.color = "#dc3545";

    const balanceCell = document.createElement("td");
    balanceCell.textContent = formatRupiah(-amount);
    balanceCell.style.fontWeight = "600";
    balanceCell.style.color = "#dc3545";

    const percentageCell = document.createElement("td");
    const percentage = expense > 0 ? Math.round((amount / expense) * 100) : 0;
    percentageCell.textContent = `${percentage}%`;

    row.appendChild(categoryCell);
    row.appendChild(incomeCell);
    row.appendChild(expenseCell);
    row.appendChild(balanceCell);
    row.appendChild(percentageCell);

    reportDetailsBody.appendChild(row);
  }

  // Total row
  const totalRow = document.createElement("tr");
  totalRow.style.fontWeight = "700";
  totalRow.style.backgroundColor = "#f8f9fa";

  const totalLabel = document.createElement("td");
  totalLabel.textContent = "TOTAL";

  const totalIncomeCell = document.createElement("td");
  totalIncomeCell.textContent = formatRupiah(income);

  const totalExpenseCell = document.createElement("td");
  totalExpenseCell.textContent = formatRupiah(expense);

  const totalBalanceCell = document.createElement("td");
  const balance = income - expense;
  totalBalanceCell.textContent = formatRupiah(balance);
  totalBalanceCell.style.color = balance >= 0 ? "#28a745" : "#dc3545";

  const totalPercentageCell = document.createElement("td");
  totalPercentageCell.textContent = "100%";

  totalRow.appendChild(totalLabel);
  totalRow.appendChild(totalIncomeCell);
  totalRow.appendChild(totalExpenseCell);
  totalRow.appendChild(totalBalanceCell);
  totalRow.appendChild(totalPercentageCell);

  reportDetailsBody.appendChild(totalRow);
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.classList.add("show");

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Delete modal
let deleteType = null;
let deleteId = null;

function showDeleteModal(type, id, details) {
  const modal = document.getElementById("delete-modal");
  const deleteItemDetails = document.querySelector(".delete-item-details");

  deleteType = type;
  deleteId = id;
  deleteItemDetails.textContent = details;

  modal.classList.add("active");
}

function setupDeleteModal() {
  const modal = document.getElementById("delete-modal");
  const closeModal = document.querySelector(".close-modal");
  const cancelDelete = document.getElementById("cancel-delete");
  const confirmDelete = document.getElementById("confirm-delete");

  // Close modal buttons
  closeModal.addEventListener("click", function () {
    modal.classList.remove("active");
  });

  cancelDelete.addEventListener("click", function () {
    modal.classList.remove("active");
  });

  // Confirm delete
  confirmDelete.addEventListener("click", function () {
    if (deleteType === "transaksi") {
      // Delete transaction
      const index = transactions.findIndex((t) => t.id === deleteId);
      if (index !== -1) {
        const deletedTransaction = transactions[index];

        // Update budget spent if it was an expense
        if (deletedTransaction.type === "expense") {
          updateAllBudgetsSpent(); // Recalculate all budgets
        }

        transactions.splice(index, 1);
        saveTransactions();

        // Update UI
        updateActiveSection("dashboard");
        updateActiveSection("transaksi");

        showToast("Transaksi berhasil dihapus!");
      }
    } else if (deleteType === "anggaran") {
      // Delete budget
      const index = budgets.findIndex((b) => b.id === deleteId);
      if (index !== -1) {
        budgets.splice(index, 1);
        saveBudgets();

        // Update UI
        updateActiveSection("anggaran");

        showToast("Anggaran berhasil dihapus!");
      }
    } else if (deleteType === "target") {
      // Delete target
      const index = targets.findIndex((t) => t.id === deleteId);
      if (index !== -1) {
        targets.splice(index, 1);
        saveTargets();

        // Update UI
        updateActiveSection("target");

        showToast("Target berhasil dihapus!");
      }
    }

    modal.classList.remove("active");
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// Fungsi untuk download laporan PDF
async function downloadFinancialReport() {
  try {
    // Tampilkan loading
    const generateReportBtn = document.getElementById("generate-report-btn");
    const originalText = generateReportBtn.innerHTML;
    generateReportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuat Laporan...';
    generateReportBtn.disabled = true;

    // Buat konten PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const currentDate = new Date();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const lineHeight = 7;

    // Judul
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("LAPORAN KEUANGAN FINTRACK", pageWidth / 2, 20, { align: "center" });

    // Tanggal
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Tanggal: ${formatDate(currentDate)}`, pageWidth / 2, 30, { align: "center" });

    let yPos = 45;

    // ================= RINGKASAN KEUANGAN =================
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("RINGKASAN KEUANGAN", margin, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const currentBalance = document.getElementById("current-balance").textContent;
    const monthExpense = document.getElementById("month-expense").textContent;
    const monthIncome = document.getElementById("month-income").textContent;
    const totalSavings = document.getElementById("total-savings").textContent;

    doc.text(`Saldo Saat Ini: ${currentBalance}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Pengeluaran Bulan Ini: ${monthExpense}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Pemasukan Bulan Ini: ${monthIncome}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Tabungan & Investasi: ${totalSavings}`, margin, yPos);
    yPos += 15;

    // ================= TRANSAKSI TERBARU =================
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("TRANSAKSI TERBARU", margin, yPos);
    yPos += 10;

    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const recentTransactions = sortedTransactions.slice(0, 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    if (recentTransactions.length === 0) {
      doc.text("Belum ada transaksi", margin, yPos);
      yPos += lineHeight;
    } else {
      // Header tabel
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Tanggal", margin + 2, yPos);
      doc.text("Keterangan", margin + 30, yPos);
      doc.text("Kategori", margin + 80, yPos);
      doc.text("Jenis", margin + 120, yPos);
      doc.text("Jumlah", pageWidth - margin - 25, yPos, { align: "right" });
      yPos += 8;

      doc.setFont("helvetica", "normal");

      for (const transaction of recentTransactions) {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
          doc.setFont("helvetica", "normal");
        }

        const type = transaction.type === "income" ? "Pemasukan" : "Pengeluaran";
        const amount = formatRupiah(transaction.amount);

        // Potong teks jika terlalu panjang
        const dateText = formatShortDate(transaction.date);
        let descText = transaction.description;
        if (descText.length > 25) descText = descText.substring(0, 22) + "...";

        doc.text(dateText, margin + 2, yPos);
        doc.text(descText, margin + 30, yPos);
        doc.text(transaction.category, margin + 80, yPos);
        doc.text(type, margin + 120, yPos);

        // Warna berdasarkan jenis transaksi
        if (transaction.type === "income") {
          doc.setTextColor(40, 167, 69); // Hijau
        } else {
          doc.setTextColor(220, 53, 69); // Merah
        }

        doc.text(amount, pageWidth - margin - 2, yPos, { align: "right" });
        doc.setTextColor(0, 0, 0); // Reset ke hitam

        yPos += lineHeight;
      }
    }

    yPos += 10;

    // ================= ANGGARAN BULANAN =================
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("ANGGARAN BULANAN", margin, yPos);
    yPos += 10;

    const monthlyBudgets = budgets.filter((b) => b.period === "monthly");

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    if (monthlyBudgets.length === 0) {
      doc.text("Belum ada anggaran yang ditetapkan", margin, yPos);
      yPos += lineHeight;
    } else {
      // Header tabel anggaran
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Kategori", margin + 2, yPos);
      doc.text("Terpakai", margin + 60, yPos);
      doc.text("Anggaran", margin + 100, yPos);
      doc.text("Sisa", pageWidth - margin - 25, yPos, { align: "right" });
      yPos += 8;

      doc.setFont("helvetica", "normal");

      for (const budget of monthlyBudgets) {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
          doc.setFont("helvetica", "normal");
        }

        const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
        const remaining = budget.amount - budget.spent;

        doc.text(budget.category, margin + 2, yPos);
        doc.text(formatRupiah(budget.spent), margin + 60, yPos);
        doc.text(formatRupiah(budget.amount), margin + 100, yPos);

        // Warna berdasarkan sisa anggaran
        if (remaining < 0) {
          doc.setTextColor(220, 53, 69); // Merah untuk minus
        } else if (percentage > 90) {
          doc.setTextColor(255, 140, 0); // Oranye untuk hampir habis
        } else {
          doc.setTextColor(40, 167, 69); // Hijau untuk aman
        }

        doc.text(formatRupiah(remaining), pageWidth - margin - 2, yPos, { align: "right" });
        doc.setTextColor(0, 0, 0); // Reset ke hitam

        yPos += lineHeight;
      }
    }

    yPos += 10;

    // ================= TARGET KEUANGAN =================
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("TARGET KEUANGAN", margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    if (targets.length === 0) {
      doc.text("Belum ada target keuangan", margin, yPos);
      yPos += lineHeight;
    } else {
      // Header tabel target
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Nama Target", margin + 2, yPos);
      doc.text("Terkumpul", margin + 60, yPos);
      doc.text("Target", margin + 100, yPos);
      doc.text("Sisa", pageWidth - margin - 40, yPos);
      doc.text("Jatuh Tempo", pageWidth - margin - 2, yPos, { align: "right" });
      yPos += 8;

      doc.setFont("helvetica", "normal");

      for (const target of targets) {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
          doc.setFont("helvetica", "normal");
        }

        const percentage = Math.min((target.saved / target.amount) * 100, 100);
        const remaining = target.amount - target.saved;
        const deadlineDate = new Date(target.deadline);
        const now = new Date();
        const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

        // Potong nama jika terlalu panjang
        let nameText = target.name;
        if (nameText.length > 20) nameText = nameText.substring(0, 17) + "...";

        doc.text(nameText, margin + 2, yPos);
        doc.text(formatRupiah(target.saved), margin + 60, yPos);
        doc.text(formatRupiah(target.amount), margin + 100, yPos);

        // Warna berdasarkan sisa target
        if (remaining < 0) {
          doc.setTextColor(220, 53, 69); // Merah
        } else if (remaining > 0) {
          doc.setTextColor(40, 167, 69); // Hijau
        }

        doc.text(formatRupiah(remaining), pageWidth - margin - 40, yPos);
        doc.setTextColor(0, 0, 0); // Reset ke hitam

        // Warna berdasarkan deadline
        if (diffDays < 0) {
          doc.setTextColor(220, 53, 69); // Merah untuk lewat deadline
        } else if (diffDays < 30) {
          doc.setTextColor(255, 140, 0); // Oranye untuk deadline dekat
        }

        doc.text(formatShortDate(target.deadline), pageWidth - margin - 2, yPos, {
          align: "right",
        });
        doc.setTextColor(0, 0, 0); // Reset ke hitam

        yPos += lineHeight;
      }
    }

    // Tambahkan footer dengan nomor halaman
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text(
        `Halaman ${i} dari ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
      doc.text(
        `© FinTrack - ${currentDate.getFullYear()}`,
        pageWidth - margin,
        doc.internal.pageSize.getHeight() - 10,
        { align: "right" }
      );
    }

    // Simpan PDF
    const fileName = `Laporan_Keuangan_FinTrack_${currentDate.getFullYear()}_${
      currentDate.getMonth() + 1
    }_${currentDate.getDate()}.pdf`;
    doc.save(fileName);

    // Reset button state
    generateReportBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Unduh Laporan PDF';
    generateReportBtn.disabled = false;

    showToast("Laporan PDF berhasil diunduh!");
  } catch (error) {
    console.error("Error generating PDF:", error);

    // Reset button state
    const generateReportBtn = document.getElementById("generate-report-btn");
    generateReportBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Unduh Laporan PDF';
    generateReportBtn.disabled = false;

    showToast("Terjadi error saat membuat PDF. Silakan coba lagi.");
  }
}

// Report download - DIUBAH untuk download PDF
function setupReportDownload() {
  const generateReportBtn = document.getElementById("generate-report-btn");

  generateReportBtn.addEventListener("click", function () {
    downloadFinancialReport();
  });
}

// Export/Import functionality - HANYA PDF
function setupExportImport() {
  const exportModal = document.getElementById("export-modal");
  const exportDataBtn = document.getElementById("export-data-btn");
  const resetDataBtn = document.getElementById("reset-data-btn");

  // Export data ke PDF
  exportDataBtn.addEventListener("click", async function () {
    try {
      exportDataBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuat PDF...';
      exportDataBtn.disabled = true;

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      const currentDate = new Date();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const lineHeight = 7;

      // Judul
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("BACKUP DATA FINTRACK", pageWidth / 2, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Tanggal Backup: ${formatDate(currentDate)}`, pageWidth / 2, 30, {
        align: "center",
      });
      doc.text(
        `Total Data: ${transactions.length} transaksi, ${budgets.length} anggaran, ${targets.length} target`,
        pageWidth / 2,
        37,
        { align: "center" }
      );

      let yPos = 50;

      // ================= DATA TRANSAKSI =================
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("DATA TRANSAKSI", margin, yPos);
      yPos += 10;

      if (transactions.length === 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Tidak ada data transaksi", margin, yPos);
        yPos += lineHeight;
      } else {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        // Header tabel
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.text("Tanggal", margin + 2, yPos);
        doc.text("Jenis", margin + 30, yPos);
        doc.text("Kategori", margin + 50, yPos);
        doc.text("Keterangan", margin + 85, yPos);
        doc.text("Jumlah", pageWidth - margin - 25, yPos, { align: "right" });
        yPos += 8;

        doc.setFont("helvetica", "normal");

        // Limit data untuk menghindari PDF terlalu besar
        const displayTransactions = transactions.slice(0, 100);

        for (const transaction of displayTransactions) {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
            doc.setFont("helvetica", "normal");
          }

          const type = transaction.type === "income" ? "Pemasukan" : "Pengeluaran";
          const amount = formatRupiah(transaction.amount);

          // Potong teks jika terlalu panjang
          const dateText = formatShortDate(transaction.date);
          let descText = transaction.description;
          if (descText.length > 30) descText = descText.substring(0, 27) + "...";
          let catText = transaction.category;
          if (catText.length > 15) catText = catText.substring(0, 12) + "...";

          doc.text(dateText, margin + 2, yPos);
          doc.text(type, margin + 30, yPos);
          doc.text(catText, margin + 50, yPos);
          doc.text(descText, margin + 85, yPos);

          // Warna berdasarkan jenis transaksi
          if (transaction.type === "income") {
            doc.setTextColor(40, 167, 69);
          } else {
            doc.setTextColor(220, 53, 69);
          }

          doc.text(amount, pageWidth - margin - 2, yPos, { align: "right" });
          doc.setTextColor(0, 0, 0);

          yPos += lineHeight;
        }

        if (transactions.length > 100) {
          yPos += 5;
          doc.setFont("helvetica", "italic");
          doc.text(`... dan ${transactions.length - 100} transaksi lainnya`, margin, yPos);
          doc.setFont("helvetica", "normal");
        }
      }

      yPos += 15;

      // ================= DATA ANGGARAN =================
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("DATA ANGGARAN", margin, yPos);
      yPos += 10;

      if (budgets.length === 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Tidak ada data anggaran", margin, yPos);
        yPos += lineHeight;
      } else {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        // Header tabel
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.text("Kategori", margin + 2, yPos);
        doc.text("Periode", margin + 50, yPos);
        doc.text("Anggaran", margin + 80, yPos);
        doc.text("Terpakai", pageWidth - margin - 25, yPos, { align: "right" });
        yPos += 8;

        doc.setFont("helvetica", "normal");

        for (const budget of budgets) {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
            doc.setFont("helvetica", "normal");
          }

          doc.text(budget.category, margin + 2, yPos);
          doc.text(budget.period === "monthly" ? "Bulanan" : "Tahunan", margin + 50, yPos);
          doc.text(formatRupiah(budget.amount), margin + 80, yPos);
          doc.text(formatRupiah(budget.spent), pageWidth - margin - 2, yPos, { align: "right" });

          yPos += lineHeight;
        }
      }

      yPos += 15;

      // ================= DATA TARGET =================
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("DATA TARGET", margin, yPos);
      yPos += 10;

      if (targets.length === 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Tidak ada data target", margin, yPos);
        yPos += lineHeight;
      } else {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        // Header tabel
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.text("Nama Target", margin + 2, yPos);
        doc.text("Target", margin + 60, yPos);
        doc.text("Terkumpul", margin + 100, yPos);
        doc.text("Sisa", pageWidth - margin - 40, yPos);
        doc.text("Deadline", pageWidth - margin - 2, yPos, { align: "right" });
        yPos += 8;

        doc.setFont("helvetica", "normal");

        for (const target of targets) {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
            doc.setFont("helvetica", "normal");
          }

          const remaining = target.amount - target.saved;

          // Potong nama jika terlalu panjang
          let nameText = target.name;
          if (nameText.length > 25) nameText = nameText.substring(0, 22) + "...";

          doc.text(nameText, margin + 2, yPos);
          doc.text(formatRupiah(target.amount), margin + 60, yPos);
          doc.text(formatRupiah(target.saved), margin + 100, yPos);

          // Warna berdasarkan sisa target
          if (remaining < 0) {
            doc.setTextColor(220, 53, 69);
          } else if (remaining > 0) {
            doc.setTextColor(40, 167, 69);
          }

          doc.text(formatRupiah(remaining), pageWidth - margin - 40, yPos);
          doc.setTextColor(0, 0, 0);

          doc.text(formatShortDate(target.deadline), pageWidth - margin - 2, yPos, {
            align: "right",
          });

          yPos += lineHeight;
        }
      }

      // Tambahkan footer dengan nomor halaman
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(
          `Halaman ${i} dari ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
        doc.text(
          `Backup Data FinTrack - ${currentDate.getFullYear()}`,
          pageWidth - margin,
          doc.internal.pageSize.getHeight() - 10,
          { align: "right" }
        );
      }

      // Simpan PDF
      const fileName = `Backup_Data_FinTrack_${currentDate.getFullYear()}_${
        currentDate.getMonth() + 1
      }_${currentDate.getDate()}.pdf`;
      doc.save(fileName);

      // Tutup modal
      exportModal.classList.remove("active");

      // Reset button state
      exportDataBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Ekspor Data ke PDF';
      exportDataBtn.disabled = false;

      showToast("Data berhasil diekspor ke PDF!");
    } catch (error) {
      console.error("Error exporting to PDF:", error);

      exportDataBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Ekspor Data ke PDF';
      exportDataBtn.disabled = false;

      showToast("Terjadi error saat membuat PDF.");
    }
  });

  // Reset data
  resetDataBtn.addEventListener("click", function () {
    if (
      confirm(
        "PERINGATAN: Tindakan ini akan menghapus semua data dan mengembalikan ke data contoh. Lanjutkan?"
      )
    ) {
      // Clear localStorage
      localStorage.removeItem("fintrack_transactions");
      localStorage.removeItem("fintrack_budgets");
      localStorage.removeItem("fintrack_targets");

      // Reinitialize with example data
      initializeData();

      // Update UI
      updateActiveSection("dashboard");

      showToast("Data berhasil direset ke contoh!");
    }
  });

  // Close modal buttons
  const closeModalBtns = exportModal.querySelectorAll(".close-modal");
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      exportModal.classList.remove("active");
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === exportModal) {
      exportModal.classList.remove("active");
    }
  });
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  // Initialize data
  initializeData();

  // Setup navigation (header + footer)
  setupNavigation();

  // Setup forms
  setupTransactionForm();
  setupBudgetForm();
  setupTargetForm();

  // Setup modals
  setupDeleteModal();
  setupExportImport();

  // Setup report download
  setupReportDownload();

  // Set default date for transaction form
  document.getElementById("transaction-date").valueAsDate = new Date();

  // Update dashboard as initial view
  updateActiveSection("dashboard");

  // Add export button to header
  addExportButton();
});

// Add export button to header
function addExportButton() {
  const userInfo = document.querySelector(".user-info");
  const exportBtn = document.createElement("button");
  exportBtn.className = "btn-secondary";
  exportBtn.innerHTML = '<i class="fas fa-database"></i>';
  exportBtn.title = "Backup & Restore Data";
  exportBtn.style.marginLeft = "10px";
  exportBtn.style.padding = "8px 12px";

  exportBtn.addEventListener("click", function () {
    const exportModal = document.getElementById("export-modal");
    exportModal.classList.add("active");
  });

  userInfo.appendChild(exportBtn);
}