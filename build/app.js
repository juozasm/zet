"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var activePage = 1;
var imagePath = '';
var imgPerPage = 8;
var comments = [{
    imageId: '0',
    name: 'John Johnson',
    email: 'test@test.com',
    comment: 'Nice photo!!',
    personImg: './build/assets/images/person/1.jpg'

}, {
    imageId: '1',
    name: 'James Morrison',
    email: 'test@test.com',
    comment: 'Thanks, John',
    personImg: './build/assets/images/person/2.jpg'
}];
var data = [{
    name: 'Image name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path: './build/assets/images/cropped/1.jpg'

}, {
    name: 'Image name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path: './build/assets/images/cropped/2.jpg'
}, {
    name: 'Image name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path: './build/assets/images/cropped/3.jpg'
}, {
    name: 'Image name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path: './build/assets/images/cropped/4.jpg'
}, {
    name: 'Image name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path: './build/assets/images/cropped/5.jpg'
}, {
    name: 'Image name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path: './build/assets/images/cropped/6.jpg'
}, {
    name: 'Image name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path: './build/assets/images/cropped/7.jpg'
}, {
    name: 'Image name',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path: './build/assets/images/cropped/8.jpg'
}];
var mainGallery = document.getElementById('maingal');
var mainComment = document.getElementById('maincom');
var galleryDiv = document.getElementById('gallery');
var pager = document.getElementById('pager');
var commentsDiv = document.getElementById('comments');

document.getElementById("uploadBtn").onchange = function (event) {
    document.getElementById("uploadFile").value = this.value;
    storeImagePath(event);
};

var render = function render() {
    galleryDiv.innerHTML = '';
    document.getElementById('arrowBack2').onclick = function () {
        return arrowBackGal(activePage);
    };
    document.getElementById('arrowForward2').onclick = function () {
        return arrowForwardGal(activePage);
    };
    data.map(function (item, i) {

        if (i < 8) {
            item.page = 1;
        } else {
            item.page = Math.floor((i + imgPerPage) / imgPerPage);
        }
        var div = document.createElement('div');
        div.className = 'galleryItem ' + (activePage != item.page ? 'hidden' : '') + ' ';
        div.id = i;
        div.onclick = function () {
            return loadComments(i);
        };
        var img = document.createElement('img');
        img.className = 'opacityZero';

        var h2 = document.createElement('h2');
        var p = document.createElement('p');
        img.setAttribute("src", item.path);
        h2.appendChild(document.createTextNode(item.name));
        p.appendChild(document.createTextNode(item.desc));
        window.setTimeout(function () {
            img.className = 'fade-in';
        }, 300);
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        galleryDiv.appendChild(div);
    });
    var unique = [].concat(_toConsumableArray(new Set(data.map(function (item) {
        return item.page;
    }))));
    if (unique.length > 0) {

        unique.map(function (item) {
            if (!pager.querySelectorAll('span')[item - 1]) {
                var span = document.createElement('span');
                span.onclick = function () {
                    return changePage(item);
                };
                span.id = item;
                if (item == 1 && unique.length == 1) {
                    span.className = "active";
                }
                span.appendChild(document.createTextNode(item));

                pager.appendChild(span);
            }
        });
    }
};
var renderComments = function renderComments(imageId) {

    commentsDiv.innerHTML = "";
    document.getElementById('arrowBack').onclick = function () {
        return arrowBack(imageId);
    };
    document.getElementById('arrowForward').onclick = function () {
        return arrowForward(imageId);
    };
    document.getElementById('image-name').textContent = data[imageId].name;
    document.getElementById('image-desc').textContent = data[imageId].desc;
    var tempImg = document.getElementById('image-img');
    tempImg.src = data[imageId].path;
    tempImg.className = 'opacityZero';
    window.setTimeout(function () {
        tempImg.className = 'fade-in';
    }, 300);

    comments.map(function (item, i) {
        if (imageId == item.imageId) {
            ;
            var img = document.createElement('img');
            img.className = "person-image";
            img.setAttribute("src", item.personImg);
            var pname = document.createElement('p');
            pname.className = "name";
            pname.appendChild(document.createTextNode(item.name));
            var pcomment = document.createElement('p');
            pcomment.className = "comment";
            pcomment.appendChild(document.createTextNode(item.comment));
            var div = document.createElement('div');
            div.className = "comment-wrapper";

            div.appendChild(pname);
            div.appendChild(pcomment);
            commentsDiv.appendChild(img);
            commentsDiv.appendChild(div);
        }
    });
};

history.pushState(null, null);
window.onpopstate = function () {
    mainComment.classList.add('hidden');
    mainGallery.classList.remove('hidden');
};

function loadComments(i) {
    mainGallery.classList.add('hidden');
    mainComment.classList.remove('hidden');
    var form = document.querySelector('form.comform');
    form.onsubmit = function (e) {
        e.preventDefault();
        onSubmitComments(i);
    };
    renderComments(i);
}
function changePage(page) {
    activePage = page;
    if (pager.querySelector('.active')) {
        var pageActive = pager.querySelector('.active');
        pageActive.classList.remove('active');
    }
    var pages = pager.querySelectorAll('span');
    pages[page - 1].classList.add('active');
    render();
}
function onSubmit() {
    var form = document.querySelector('form.galform');
    var values = Object.values(form).reduce(function (obj, field) {
        obj[field.name] = field.value;return obj;
    }, {});
    data.push({ name: values.file_name, desc: values.description, path: imagePath, page: Math.floor((data.length - 1 + imgPerPage) / imgPerPage) });
    render();
}
function onSubmitComments(imageId) {

    var form = document.querySelector('form.comform');
    var values = Object.values(form).reduce(function (obj, field) {
        obj[field.name] = field.value;return obj;
    }, {});
    comments.push({ name: values.person_name, email: values.person_email, comment: values.comment, imageId: imageId, personImg: './build/assets/images/person/3.jpg' });
    renderComments(imageId);
}

function storeImagePath() {
    var reader = new FileReader();
    reader.onload = function () {
        imagePath = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
function arrowBack(imageId) {
    console.log(imageId);
    if (imageId > 0) {
        loadComments(imageId - 1);
    } else {
        loadComments(data.length - 1);
    }
}
function arrowForward(imageId) {
    console.log(imageId);
    if (imageId < data.length - 1) {
        loadComments(imageId + 1);
    } else {
        loadComments(0);
    }
}
function arrowBackGal(i) {
    console.log(i);
    if (i > 1) {

        changePage(i - 1);
    } else {

        changePage(data.length);
    }
}
function arrowForwardGal(i) {
    console.log(i);
    if (i < data.length) {

        changePage(i + 1);
    } else {

        changePage(1);
    }
}

window.onload = render;