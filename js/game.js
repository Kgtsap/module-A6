const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let fine = 0;
let count =1;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $('.target').removeClass('target');

  let divSelector = randomDivId();
   $(divSelector).removeClass('miss');
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(divSelector).text(` ${count}`);
  count=count+1;
  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $('#end').addClass('end');
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $('#fine').text(fine);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  $('.target').text('');
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;

    round();
  }
  else{
    $(event.target).addClass('miss');
    fine = fine +1;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {

  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  firstHitTime=getTimestamp();
  $("#button-reload").click(function() {
    $("#end").removeClass('end');

    if (hits>0){
      location.reload();
    }
    
  });
}

$(document).ready(init);
