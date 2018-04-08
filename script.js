$(".idea-cards").on('click', '.article__button-delete', deleteCard);
$('.form__button').on('click', saveButton);
$('.idea-cards').on('click', '.article__button-upvote', upVote);
$('.idea-cards').on('click', '.article__button-downvote', downVote);
$('.form__input').on('keyup', enableSaveButton)
$('.section__input').on('keyup', searchIdeas);
// $('.idea-cards').on('input', saveIdeaUpdates);
$('.idea-cards').on('keyup', '.article__h2, .article__p-body', editText);

function Card(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || $.now();
  this.quality = quality || "normal";   /*swill*/
}

$(document).ready(pullFromLocal);

function cardPrepend(newCard) {
  $(".idea-cards").prepend(`
    <article class="idea-article" id="${newCard.id}">
        <h2 class="article__h2" contenteditable="true">${newCard.title}</h2>
        <button class="article__button-delete"></button>
        <p class="article__p-body" contenteditable="true">${newCard.body}</p>
        <button class="article__button article__button-downvote"></button>
        <button class="article__button article__button-upvote"></button>
        <p class="quality">quality:\u00A0</p>
        <p class="quality article__p-quality">${newCard.quality}</p>
        <hr>
      </article>
      `);
  disableSaveButton();
}

function deleteCard() {
  var card = this.closest("article").id;
  localStorage.removeItem(card);
  this.closest("article").remove();
}

function saveButton(e) {
  e.preventDefault();
  var cardTitle = $(".form__input-title");
  var cardBody = $(".form__input-body");
  var newCard = new Card(cardTitle.val(), cardBody.val());
  // enableSaveButton();
  cardPrepend(newCard);
  addToLocal(newCard);
  clearFields();
}

function clearFields() {
  var cardTitle = $(".form__input-title");
  var cardBody = $(".form__input-body");
  cardTitle.val("");
  cardBody.val("");
}

function enableSaveButton() {
  var saveButton = $(".form__button");
  var cardTitle = $(".form__input-title");
  var cardBody = $(".form__input-body");
  if (cardTitle.value !== "" && cardBody.value !== "") { 
    saveButton.prop('disabled', false);
  } else {
    saveButton.prop('disabled', true);
  }
}

function disableSaveButton() {
  var saveButton = $(".form__button");
  saveButton.prop('disabled', true);
}

function addToLocal(newCard) {
  var stringifyObj = JSON.stringify(newCard);
  localStorage.setItem(newCard.id, stringifyObj);
}

function pullFromLocal() {
  for (i = 0; i < localStorage.length; i++) {
    var getCard = localStorage.getItem(localStorage.key(i));
    var newCard = JSON.parse(getCard);
    cardPrepend(newCard)

  }
}


function upVote(event) {
  var parentId = $(event.target).parent().attr('id');
  var currentQuality = $(event.target).siblings(".article__p-quality");
  if (currentQuality.text() === 'normal') {
    $(currentQuality).text('plausible');
  } else if (currentQuality.text() === 'plausible') {
    $(currentQuality).text('GENIUS');
  }

// function upVote(event) {
//   var parentId = $(event.target).parent().attr('id');
//   var currentQuality = $(event.target).siblings(".article__p-quality");
//   if (currentQuality.text() === 'swill') {
//     $(currentQuality).text('plausible');
//   } else if (currentQuality.text() === 'plausible') {
//     $(currentQuality).text('GENIUS');
//   }
  var parsedCard = JSON.parse(localStorage.getItem(parentId));
  parsedCard.quality = $(currentQuality).text();
  localStorage.setItem(parsedCard.id, JSON.stringify(parsedCard));
}

function downVote(event) {
  var parentId = $(event.target).parent().attr("id");
  var currentQuality = $(event.target).siblings('.article__p-quality');
  if ($(currentQuality).text() === 'GENIUS') {
    $(currentQuality).text('plausible')
  } else if ($(currentQuality).text() === 'plausible') {
    $(currentQuality).text('swill')
  }
  var parsedCard = JSON.parse(localStorage.getItem(parentId))
  parsedCard.quality = $(currentQuality).text()
  localStorage.setItem(parsedCard.id, JSON.stringify(parsedCard))
}


function searchIdeas() {
 var searchValue = $(this).val().toLowerCase();
 $(".idea-cards .idea-article").filter(function () {
   $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
 });
 addToLocal();
};

function editText() {
 var currentId = event.target.closest('.idea-article').id;
 var parsedCard = JSON.parse(localStorage.getItem(currentId));
 var newTitle = $(`#${currentId} .article__h2`).text();
 var newDescription = $(`#${currentId} .article__p-body`).text();
 parsedCard['title'] = newTitle;
 parsedCard['body'] = newDescription;
 addToLocal(parsedCard);
}








  

// function saveIdeaUpdates(e) {
//     console.log($(this))
//     var updatedIdea = e.target.closest('.idea-article');  
//     var updatedIdeaTitle = updatedIdea.querySelector('.form__input-title').text;
//     var updatedIdeaBody = updatedIdea.querySelector('.form__input-body').text;
//     var updatedIdeaId = updatedIdea.id;
//     var existingIdeasString = localStorage.getItem(localStorage.key(i));  /*localStorage.key(i) */
//     var existingIdeasObj = JSON.parse(existingIdeasString);

//     for(i = 0; i < existingIdeasObj.length; i++) {
//       var existingIdeaId = existingIdeasObj[i].id;

//       if(existingIdeaId == updatedIdeaId) {
//         existingIdeasObj[i].title = updatedIdeaTitle;
//         existingIdeasObj[i].body = updatedIdeaBody;
//       }
//     }
//     sendToStorage(existingIdeasObj)
//   };





