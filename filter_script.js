// check_arr: all rows needs checking
// tag_inc: all member options want to include
// tage_exc: all member options want to exclude
var check_arr = [], tag_inc = [], tag_exc = [];
uncheckAll();

// push tag to array indicated by instruction
function pushTag(tag, instruction) {
  if (instruction == "inc") {
    tag_inc.push(tag);
  } else if (instruction == "exc"){
    tag_exc.push(tag);
  }
  filterRows();
}

function filterRows() {
  var i;
  // temp_arr: all rows that match selected options
  var temp_arr = [];
  for (i = 0; i < check_arr.length; i++) {
    hideRow(check_arr[i]);
    if (checkOverall(check_arr[i])) {
      showRow(check_arr[i]);
      temp_arr.push(check_arr[i]);
    }
  }
  check_arr = temp_arr;
}

// Check if row satisfies selected option by calling both 
// checkExclusion() and checkInclusion
function checkOverall(element){
  if (checkExclusion(element)){
    return 0;
  } else {
    var res = checkInclusion(element);
    return res;
  }
}

// Check if the row includes any tag in tag_exc array
function checkExclusion(element) {
  var j;
  element_arr = rowToArr(element);
  for (j = 0; j < element_arr.length; j++) {
    if (tag_exc.includes(element_arr[j])){
      return 1;
    }
  }
  return 0;
}

// Check if the row contains all tags in tag_inc array
function checkInclusion(element) {
  element_arr = rowToArr(element);
  var res = tag_inc.every(val => element_arr.includes(val));
  return res;
}

function hideRow(element) {
  element.className = "row hide";
}

function showRow(element) {
  element.className = "row";
}

function uncheckAll() {
  var i;
  document.querySelectorAll('input[type="checkbox"]')
    .forEach(el => el.checked = false);
  tag_inc = [];
  tag_exc = [];
  check_arr = document.getElementsByClassName("row");
  for (i = 0; i < check_arr.length; i++) {
    showRow(check_arr[i]);
  }
}

document.querySelector('button').addEventListener('click', uncheckAll)


function rowToArr(row) {
  var k;
  var arr = [];
  for (k = 1; k < 5; k++) {
    arr.push(row.cells[k].innerText);
  }
  return arr;
}
