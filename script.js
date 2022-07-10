var url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
let tbody = document.querySelector("tbody");
let infoBox = document.querySelector("#info-content");

getData();
async function getData() {
  try {
    const res = await fetch(url);
    let data = await res.json();
    data.map((item) => {
      tbody.innerHTML += `<tr class="data-row">
      <td class="column1">${item.id}</td>
      <td class="column2">${item.firstName}</td>
      <td class="column3">${item.lastName}</td>
      <td class="column4">${item.email}</td>
      <td class="column5">${item.phone}</td>
    </tr>`;
    });
    let tr = document.querySelectorAll("tr");
    //   console.log(activeRow);

    tr.forEach((rows) => {
      rows.addEventListener("click", function () {
        rows.className = "data-row";
        // activeRow.classList.remove("active");
        var activeEle = document.querySelector(".active");
        if (activeEle === null) {
          this.classList.add("active");
        } else {
          activeEle.classList.remove("active");
        }
        this.classList.add("active");
        //   console.log(this.firstElementChild.innerText);
        let selectedId = this.firstElementChild.innerText;

        data.map((item) => {
          //   console.log(selectedId, item.id);
          if (selectedId == item.id) {
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
      rows.classList.remove("active");
    });
  } catch (err) {
    console.log(err);
  }
}

let searchItem = document.getElementById("search-box");
searchItem.addEventListener("input", function (e) {
  //   console.log(e.target.value);
  let tr = document.getElementsByTagName("tr");
  let tableContent = "";
  for (let i = 1; i < tr.length; i++) {
    // console.log(tr[i].innerText.includes(e.target.value));
    if (tr[i].innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
});
