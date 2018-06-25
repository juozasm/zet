"use strict"
let activePage=1;
let imagePath='';
let imgPerPage=8;
const comments=[{
    imageId:'0',
    name:'John Johnson',
    email:'test@test.com',
    comment:'Nice photo!!',
    personImg:'./build/assets/images/person/1.jpg',

},{
    imageId:'1',
    name:'James Morrison',
    email:'test@test.com',
    comment:'Thanks, John',
    personImg:'./build/assets/images/person/2.jpg',
}]
const data=[{
    name:'Image name',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path:'./build/assets/images/cropped/1.jpg'
    
},{
    name:'Image name',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path:'./build/assets/images/cropped/2.jpg'
},{
    name:'Image name',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path:'./build/assets/images/cropped/3.jpg'
},{
    name:'Image name',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path:'./build/assets/images/cropped/4.jpg'
},{
    name:'Image name',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path:'./build/assets/images/cropped/5.jpg'
},{
    name:'Image name',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path:'./build/assets/images/cropped/6.jpg'
},{
    name:'Image name',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path:'./build/assets/images/cropped/7.jpg'
},{
    name:'Image name',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices lacus eget sapien sodales scelerisque. Sed in orci ultrices, lobortis ipsum sed, pellentesque enim. Fusce nec blandit quam, ac vulputate ipsum. Donec vel diam libero. Praesent interdum tellus quis dui hendrerit, vel pellentesque neque fermentum.',
    path:'./build/assets/images/cropped/8.jpg'
},
// {
//     name:'Image name',
//     desc:'Lorem ipsum dolor sit amet, consectetur  adipiscing elit. Aliqu',
//     path:'./build/assets/images/1.jpg'
// }
]
const mainGallery=document.getElementById('maingal')
const mainComment=document.getElementById('maincom')
const galleryDiv = document.getElementById('gallery')
const pager=document.getElementById('pager')
const commentsDiv=document.getElementById('comments')

document.getElementById("uploadBtn").onchange = function (event) {
    document.getElementById("uploadFile").value = this.value;
    storeImagePath(event);
};


const render=function(){
    galleryDiv.innerHTML='';
    document.getElementById('arrowBack2').onclick=()=>arrowBackGal(activePage);
    document.getElementById('arrowForward2').onclick=()=>arrowForwardGal(activePage);
    data.map((item, i)=>{
        
        if(i<8){
            item.page=1;
        }else{
            item.page=Math.floor((i+imgPerPage)/imgPerPage);
        }
        let div = document.createElement('div');
        div.className = `galleryItem ${activePage!=item.page?'hidden':''} `;
        div.id=i;
        div.onclick = ()=>loadComments(i);   
        let img = document.createElement('img');
        img.className='opacityZero'
        
        let h2 = document.createElement('h2');
        let p = document.createElement('p')
        img.setAttribute("src", item.path);
        h2.appendChild(document.createTextNode(item.name))
        p.appendChild(document.createTextNode(item.desc))
        window.setTimeout( function() { img.className='fade-in'}, 300 ); 
        div.appendChild(img)
        div.appendChild(h2)
        div.appendChild(p) 
        galleryDiv.appendChild(div)
        
    })
    const unique = [...new Set(data.map(item => item.page))];  
    if(unique.length>0){
        
        unique.map((item)=>{
            if(!pager.querySelectorAll('span')[item-1])
            {
                let span=document.createElement('span');
                span.onclick =  ()=>changePage(item);
                span.id=item;
                if(item==1&&unique.length==1){
                    span.className="active";   
                }
                span.appendChild(document.createTextNode(item));
               
                pager.appendChild(span);
            }
         
        })
    }  
}
const renderComments = function(imageId){

commentsDiv.innerHTML = ""; 
document.getElementById('arrowBack').onclick=()=>arrowBack(imageId);
document.getElementById('arrowForward').onclick=()=>arrowForward(imageId);
    document.getElementById('image-name').textContent=data[imageId].name
    document.getElementById('image-desc').textContent=data[imageId].desc
    const tempImg=document.getElementById('image-img');
    tempImg.src=data[imageId].path
    tempImg.className='opacityZero';
    window.setTimeout( function() { tempImg.className='fade-in'}, 300 );

 
    comments.map((item, i)=>{
        if(imageId==item.imageId){
            ;
            let img = document.createElement('img');
            img.className="person-image"
            img.setAttribute("src", item.personImg);
            let pname = document.createElement('p');
            pname.className="name"
            pname.appendChild(document.createTextNode(item.name))
            let pcomment = document.createElement('p');
            pcomment.className="comment"
            pcomment.appendChild(document.createTextNode(item.comment))
            let div = document.createElement('div');
            div.className="comment-wrapper"
           
            div.appendChild(pname)
            div.appendChild(pcomment)
            commentsDiv.appendChild(img)
            commentsDiv.appendChild(div)
        }
       
    })
    

}

    history.pushState(null,null);
    window.onpopstate = function () {
        mainComment.classList.add('hidden')
        mainGallery.classList.remove('hidden')
    };

    function loadComments(i){
        mainGallery.classList.add('hidden')
        mainComment.classList.remove('hidden')
        const form = document.querySelector('form.comform')
        form.onsubmit=(e)=>{
            e.preventDefault();
            onSubmitComments(i);
        }
        renderComments(i);

    }
    function changePage(page){
        activePage=page;
        if(pager.querySelector('.active')){
            let pageActive=pager.querySelector('.active')
            pageActive.classList.remove('active');
        }
        let pages=pager.querySelectorAll('span');
        pages[page-1].classList.add('active');  
        render();  
    }
    function onSubmit(){
        const form = document.querySelector('form.galform')
        const values= Object.values(form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {})   
        data.push({name:values.file_name,desc:values.description,path:imagePath, page:Math.floor((data.length-1+imgPerPage)/imgPerPage)})
        render();
    }
    function onSubmitComments(imageId){
      
        const form = document.querySelector('form.comform')
        const values= Object.values(form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {})   
        comments.push({name:values.person_name,email:values.person_email,comment:values.comment,imageId:imageId,personImg:'./build/assets/images/person/3.jpg'})
        renderComments(imageId);
    }

    function storeImagePath() 
    {
     var reader = new FileReader();
     reader.onload = function()
     {
      imagePath = reader.result;
     }
     reader.readAsDataURL(event.target.files[0]);
    }
    function arrowBack(imageId){
        console.log(imageId)
        if(imageId>0){
            loadComments(imageId-1)
        }else{
            loadComments(data.length-1)
        }
    }
    function arrowForward(imageId){
        console.log(imageId)
        if(imageId<data.length-1){
            loadComments(imageId+1);
           
        }else{
            loadComments(0);
        }
    }
    function arrowBackGal(i){
        console.log(i)
        if(i>1){
            
            changePage(i-1)
            
        }else{
            
            changePage(data.length)
            
        }
    }
    function arrowForwardGal(i){
        console.log(i)
        if(i<data.length){
            
            changePage(i+1)
           
        }else{
            
            changePage(1)
            
        }
    }

window.onload=render;
