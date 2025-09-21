document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('searchForm');
    const dialog = document.getElementById('resultDialog');
    const dialogContent = document.getElementById('dialogContent');
    const closeBtn = document.getElementById('closeDialogBtn');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // prevent default form submission
  
      const query = form.query.value.trim();
      if (query) {
        dialogContent.textContent = `You searched for: "${query}"`;
        dialog.showModal();
      }
    });
  
    closeBtn.addEventListener('click', function () {
      dialog.close();
    });
  });
  