var getbookmarkname = document.getElementById("siteName");
var getbookmarkUrl = document.getElementById("siteUrl");

var bookmarkslist = [];

if (localStorage.getItem("bookmarkname") !== null) {
  bookmarkslist = JSON.parse(localStorage.getItem("bookmarkname"));
  displaybookmark();
}

function addbookmark() {
  var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  if (!urlPattern.test(getbookmarkUrl.value)) {
    alert("Please enter a valid URL starting with http:// or https://");
    return;
  }

  for (var i = 0; i < bookmarkslist.length; i++) {
    if (
      bookmarkslist[i].name.toLowerCase() ===
      getbookmarkname.value.toLowerCase()
    ) {
      alert(
        "This bookmark name already exists. Please choose a different name."
      );
      return;
    }
  }

  bookmark = {
    name: getbookmarkname.value,
    url: getbookmarkUrl.value,
  };

  bookmarkslist.push(bookmark);
  localStorage.setItem("bookmarkname", JSON.stringify(bookmarkslist));
  displaybookmark();
  clearform();
}

function clearform() {
  getbookmarkname.value = null;
  getbookmarkUrl.value = null;
}

function displaybookmark() {
  var cartona = "";
  for (var i = 0; i < bookmarkslist.length; i++) {
    cartona += `<table class="table text-center colorr">
          <thead>
            <tr>
              <th scope="col">index</th>
              <th scope="col">Website Name</th>
              <th scope="col">Visit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">${i}</th>
              <td>${bookmarkslist[i].name}</td>
              <td>
                <a href="${bookmarkslist[i].url}" target="_blank">
                  <button type="button" class="btn btn-success py-2 px-2" aria-label="Visit">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </a>
              </td>
              <td>
                <button onclick="deleteBookmark(${i})" type="button" class="btn btn-danger py-2 px-2" aria-label="Delete">
                  <i class="fa-solid fa-trash-can"></i>Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>`;
  }
  document.getElementById("table").innerHTML = cartona;
}

function deleteBookmark(index) {
  bookmarkslist.splice(index, 1);
  localStorage.setItem("bookmarkname", JSON.stringify(bookmarkslist));
  displaybookmark();
}
