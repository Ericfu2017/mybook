
 
 // initialize my empty database and store it in the localStorage :-) ^_^
 
 let myDataBase = [];
 let localDataBase;
 let tempDataBase;
 

 localDataBase = JSON.parse(localStorage.getItem('localDataBase'));

 console.log(localStorage.getItem('localDataBase'));
 
 
 
 if (localDataBase) {
     myDataBase = localDataBase;
 }
 console.log(myDataBase);



 // edit the object in myDataBase
    function editObj(obj) {
   
        let userName = window.prompt("更改用户名称：", obj.userName);
        let passWord = window.prompt("更改密码：", obj.passWord);

        if (userName !== null) {    // change the value of the object 
            obj.userName = userName;
        }
        if (passWord !== null) {
            obj.passWord = passWord;
        }  
        localStorage.setItem('localDataBase', JSON.stringify(myDataBase)); //store myDataBase data in local storage, so that it will not disappear :-)
        display(tempDataBase);
    }


    // delete the item from myDataBase array and return the new Data.
    function deleteObj(obj) {

        let choice = confirm("您确定删除该数据吗? 否则按 cancel 取消 ^_^");
        
        if (choice) {
            let index = myDataBase.findIndex(x => x.itemName === obj.itemName);
            let tempIndex = tempDataBase.findIndex(x => x.itemName === obj.itemName)
    
            tempDataBase.splice(tempIndex, 1);
            if (myDataBase.some(x => x.itemName === obj.itemName)) {
              myDataBase.splice(index, 1);
             }

            localStorage.setItem('localDataBase', JSON.stringify(myDataBase)); //store myDataBase data in local storage, so that it will not disappear :-)
             //tempDataBase = myDataBase;
             display(tempDataBase);
        }
        
    }

    // display myDataBase [{itemName, userName, passWord}, {}, {} .....]
    function display(dataBase) {
       
        const displayData = `
            <div class="container">
                <table class="table table-hover">
                <thead>
                    <tr>
                        <th>项目</th>
                        <th>用户名</th>
                        <th>密码</th
                    </tr>
                </thead>
                <tbody>
                ${renderHtml()}
                </tbody>
                </table>
            </div>
        `;
       
        function renderHtml() {  
            

            return `
                ${dataBase.map(item => `
                    <tr onmouseover="show(${myDataBase.findIndex(x => x.itemName === item.itemName)})" onmouseout="hide(${myDataBase.findIndex(x => x.itemName === item.itemName)})">
                        <td>${item.itemName}</td>
                        <td>${item.userName}</td>
                        <td>${item.passWord}</td>
                        <td><span id="${myDataBase.findIndex(x => x.itemName === item.itemName)}" onclick="editObj(myDataBase[${myDataBase.findIndex(x => x.itemName === item.itemName)}])"><i class="material-icons" onmouseover="changeClass(${myDataBase.findIndex(x => x.itemName === item.itemName)})" onmouseout="changeBack(${myDataBase.findIndex(x => x.itemName === item.itemName)})">
                        edit
                        </i></span>
                        <span id="a${myDataBase.findIndex(x => x.itemName === item.itemName)}" onclick="deleteObj(myDataBase[${myDataBase.findIndex(x => x.itemName === item.itemName)}])"><i  class="material-icons" onmouseover="changeClass('a'+${myDataBase.findIndex(x => x.itemName === item.itemName)})" onmouseout="changeBack('a'+${myDataBase.findIndex(x => x.itemName === item.itemName)})"> 
                        delete_forever
                        </i></span></td>
                    </tr>
                `).join('')}
                `;
        }


        $('#mytable').html(displayData);

    }

    
  


function show(id) {
    $('#'+id).css("visibility", "unset");
    $('#a'+id).css("visibility", "unset");
}

function hide(id) {
    $('#'+id).css("visibility", "hidden");
    $('#a'+id).css("visibility", "hidden");
}

function changeClass(id) {
    $('#'+id).attr('class', 'material-icons orange600');
}

function changeBack(id) {
    $('#'+id).attr('class', 'material-icons');
}


$(document).ready(function(){
    
    // build my object data through constructor function
    /* function Item(x, y, z) {
        this.itemName = x;
        this.userName = y;
        this.passWord = z;
    } */

    function createItem(x, y, z) {
      return {
        itemName: x,
        userName: y,
        passWord: z
      }
    }

    

    // add new object to myDataBase 
    function addItem() {
    
        let itemName = window.prompt("请输入新的项目名称：", "项目名称");
        while (myDataBase.some(obj=>obj.itemName===itemName)) {
            itemName = window.prompt("数据库中已有此项目，点击cancel 取消，或者添加新项目", "项目名称")
        }
        while (itemName === '') {
            itemName = window.prompt('项目名称不可以为空， 请再次输入新的项目名称：', '项目名称');
        }
        let userName = window.prompt("请输入用户名称：", "用户名");
        while (userName === '') {
            userName = window.prompt('用户名不可以为空，请再次输入用户名：', '用户名');
        }
        let passWord = window.prompt("请输入密码：", "密码");
        while (passWord === '') {
            passWord = window.prompt('密码不可以为空， 请再次输入密码：', '密码');
        }
        if (itemName !== null && userName !== null && passWord !==null) {
            myDataBase.push(createItem(itemName, userName, passWord));
            if(tempDataBase.findIndex(x => x.itemName === itemName) === -1) {
                tempDataBase.push(createItem(itemName, userName, passWord));
            }
        }
        
        localStorage.setItem('localDataBase', JSON.stringify(myDataBase)); //store myDataBase data in local storage, so that it will not disappear :-)
        
        display(tempDataBase);
        // $('').append(newItem)....... to be continued.....
    }


// search myDataBase and return all related objects in a new array (if more than one item matched) :-)
    function search(searchName) {

        let  result = myDataBase.filter(function(obj){
            return obj.itemName.includes(searchName);
        });

        if (!result.length) {  //if the return array is not empty, return the search result otherwise, no such item.:-)
            window.alert('对不起，系统数据库里没有您要找的资料! :-)');
        } 
        return result;
    } 
   

   $('input[name="submit"]').click(function(){
        
        
        if (this.form.username.value == "万年青" && this.form.password.value == "194755") {
         window.location.href = '/mydatabase.html';
         return false;   // open the new window in the same page :-)
        } else {
        alert("您所输入的用户名和密码不相符！");
    }
   });

   $('#logout').click(function(){
       window.location.href="/index.html";
       return false;
   });
  
   $('#addData').click(addItem);
   $('#mySearch').click(function(e){
       e.preventDefault();
       let searchValue = $('input[name="mySearch"]').val();
       display(tempDataBase = search(searchValue));  //tempDataBase point to the search result database.

   });
   $('#displayData').click(function () {
       display(tempDataBase = myDataBase.sort(function(str1, str2){
           return str1.itemName.localeCompare(str2.itemName, 'zh-Hans-CN');
       })); //tempDataBase points to myDataBase 

    });

   display(tempDataBase = myDataBase.sort(function(str1, str2){
           return str1.itemName.localeCompare(str2.itemName, 'zh-Hans-CN');
       })); 


})

