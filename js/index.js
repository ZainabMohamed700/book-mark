
let SiteName =document.getElementById('SiteName') ;
let SiteURL =document.getElementById('SiteURL');
let alertName=document.getElementById('alertName')

// console.log(SiteName)
// console.log(SiteURL)
let saveBookmark;
if(localStorage.getItem('bookMarkers')!=null)
{
    saveBookmark=JSON.parse(localStorage.getItem('bookMarkers'));
    displayData()
}
else{
    saveBookmark=[]
}
function add(){
    let bookMarkers={
         name:SiteName.value ,
         url:SiteURL.value
    }
    if(!validateForm()){
        return false
    }
    // console.log(bookMarkers)
    saveBookmark.push(bookMarkers)
    console.log(saveBookmark)
    localStorage.setItem("bookMarkers" ,JSON.stringify(saveBookmark) )
    clear()
    displayData()
}

function clear(){
    SiteName.value=''
    SiteURL.value=''
}

function displayData(){
    let cartoona=''
    for(let i=0;i<saveBookmark.length;i++){
        cartoona+= `
         <div class="my-3">
          <tr>
             <td> ${saveBookmark[i].name}</td>
               <td><button class=" btn btn-outline-primary" onclick="visit(${i})">Visit</button></td>
               <td><button class=" btn btn-outline-danger" onclick="deleteBookmark(${i})">Delete</button></td>
          </tr>
         </div> `
    }
    document.getElementById('tableData').innerHTML=cartoona
}

function deleteBookmark(index){
    saveBookmark.splice(index ,1)
    localStorage.setItem("bookMarkers" ,JSON.stringify(saveBookmark) )
    displayData()

}

function visit(index){
    window.open(saveBookmark[index].url)
}


function validateForm(){
   
    if(!SiteName.value || !SiteURL.value){
        alert('plese fill the form')
        return false
    }

  let expression=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/

  let regex = new RegExp(expression)
   
  if(!SiteURL.value.match(regex)){
     
    SiteURL.classList.add('is-invalid')
    SiteURL.classList.remove('is-valid')
    alertName.classList.remove('d-none')
    return false
  }
  else{
    SiteURL.classList.add('is-valid')
    SiteURL.classList.remove('is-invalid')
    alertName.classList.add('d-none')
    return true
  }

}

SiteURL.addEventListener('blur' , validateForm)


