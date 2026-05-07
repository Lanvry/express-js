$(document).ready(function() {
  if ($('#myTable').length) {
    $('#myTable').DataTable({
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Cari...",
        lengthMenu: "_MENU_ data per halaman",
      }
    });
  }
});
