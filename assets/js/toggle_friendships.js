// function toggleFriend(toggleFriendBtn){
//     console.log(toggleFriendBtn);
//     console.log($(toggleFriendBtn));
//     $(toggleFriendBtn).click(function(event){
//         event.preventDefault();
//         $.ajax({
//             type : "GET",
//             url : $(toggleFriendBtn).attr("href"),
//             success : function(data){
//                 console.log(data.deleted);
//                 if(data.deleted){
//                     $(toggleFriendBtn).html("Add Friend")
//                 }else{
//                     $(toggleFriendBtn).html("Remove Friend")
//                 }
//                 
//             },
//             error : function(error){
//                 console.log(error.responseText);
//             }
// 
//                 
//             });
// 
//        })
// }
// 
// console.log('hiii')
// 
// toggleFriend($(" .toggle-friend-btn"));

// class ToggleFriend{
//     constructor(toggleElement){
//         this.toggler=toggleElement;
//         this.toggleFriend();
//     }
//     toggleFriend(){
//         $(this.toggler).click(function(e){
//             e.preventDefault();
//             let self=this;
//             $.ajax({
//                 type:'POST',
//                 url:$(self).attr('href')
//             })
//             .done(function(data){
//                 console.log(data.data.toggle);
//                 if(data.data.toggle==1){
//                     $('.toggle-friend-button').html('Remove Friend');
//                     new Noty({
//                         theme: 'relax',
//                         text: `Added to your friend list`,
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
//                         
//                     }).show();
//                 }else{
//                     $('.toggle-friend-button').html('Add Friend');  
//                     new Noty({
//                         theme: 'relax',
//                         text: `Removed from your friend list`,
//                         type: 'error',
//                         layout: 'topRight',
//                         timeout: 1500
//                         
//                     }).show(); 
//                 }
// 
//             })
// 
//         })
//     }
// }



console.log('js file of toggle_friendship is loaded');
class ToggleFriendship{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriendship();
    }


    toggleFriendship(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'GET',
                url: $(self).attr('href'),
            })
            .done(function(data) {

                console.log(data,'******');
                
                if (data.data.friendAdded == true){
                    $(' button', self).html(`Remove Friend`);
                }else{
                    $(' button', self).html(`Add Friend`);
                }

            })
            .fail(function(errData) {
                console.log('error in completing the request', errData);
            });
            

        });
    }
}


