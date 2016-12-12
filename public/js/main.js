'use strict';
$( document ).ready(function() {

  let price = '';
  let categories = [];

  // $("#money-token > li").click(function(){
  //   alert(this);
  // })
  function selectMoney(){
    // console.log(this.innerHTML);
    price = this.innerHTML;
    $('#money-token span').removeClass('chosen-money');
    $(this).addClass('chosen-money');
    console.log(price);
  }

  function selectCategories(){
    let selected = this.innerHTML;
    $(this).toggleClass('chosen-category');
    if(categories.indexOf(selected)<0){
      categories.push(selected);
      console.log(categories);
    } else {
      categories.splice(categories.indexOf(selected), 1);
      console.log(categories);
    }
  }

  $('#money-token span').click(selectMoney);
  $('#category-token span').click(selectCategories);
});