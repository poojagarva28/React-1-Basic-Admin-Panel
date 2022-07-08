var url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
let tbody = document.querySelector("tbody");
let infoBox = document.querySelector("#info-content");

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    res.map((item) => {
      tbody.innerHTML += `<tr class="data-row">
        <td class="column1">${item.id}</td>
        <td class="column2">${item.firstName}</td>
        <td class="column3">${item.lastName}</td>
        <td class="column4">${item.email}</td>
        <td class="column5">${item.phone}</td>
      </tr>`;
    });
    let activeRow = document.querySelectorAll("tr");
    //   console.log(activeRow);
    activeRow.forEach((e) => {
      e.addEventListener("click", function () {
        this.classList.add("active");
        //   console.log(this.firstElementChild.innerText);
        let selectedId = this.firstElementChild.innerText;

        res.map((item) => {
          //   console.log(selectedId, item.id);
          if (selectedId == item.id) {
            console.log(true);
            infoBox.innerHTML = `<div><b>User selected:</b> ${item.firstName} ${item.lastName}</div>
          <div>
              <b>Description: </b>
              <textarea cols="50" rows="5" readonly>
                  ${item.description}
              </textarea>
          </div>
          <div><b>Address:</b> ${item.address.streetAddress}</div>
          <div><b>City:</b> ${item.address.city}</div>
          <div><b>State:</b> ${item.address.state}</div>
          <div><b>Zip:</b> ${item.address.zip}</div>
          `;
            infoBox.style.display = "block";
            return;
          }
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

let searchItem = document.getElementById("search-box");
searchItem.addEventListener("input", function (e) {
  //   console.log(e.target.value);
  let tr = document.getElementsByTagName("tr");
  let tableContent = "";
  for (let i = 1; i < tr.length; i++) {
    tableContent += tr[i].textContent;
    // console.log(tr[i].innerText.includes(e.target.value));
    if (tr[i].innerText.includes(e.target.value)) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
});
