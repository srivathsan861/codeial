{
	let createComment = function(){
		let newCommentForm = $('#new-comments-form');
		newCommentForm.submit(function(e){
			e.preventDefault();

			$.ajax({
				type:'post',
				url:'/comments/create',
				data: newCommentForm.serialize(),
				success:function(data){
					console.log(data);
					let newComment = newCommentDom(data.data.comment);
                    $(' .post-comments-list > ul').prepend(newComment);
					deleteComment($(' .delete-comment-button',newComment));

                    

                    //enable the functionality of toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));
                    

                    new Noty({

                        theme:'relax',
                        type:'success',
                        text:'Comment Added!!',
                        layout:'topRight',
                        timeout:1500


                    }).show();
				},error: function(error){
                    console.log(error.responseText);
				}
			})
		});
	}

   //method to create comment in DOM

   let newCommentDom = function(comment){
    // console.log(comment);
   	return $(`<li id="comment-${comment._id}">

                              <p>

                                 <small>
                                 <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                                 </small>

                                ${ comment.content }
                                <br>
                                <small>
                                ${ comment.user.name }
                                </small>
                                <br>
                                <small>
                                 <a class = "toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                 0 Likes 
                                 </a>
                                </small>

                              </p>
       <li>`);
   }

  // method to delete any comment 
   // method to iterate over all post  delete button
   let iterate_comment=function(){
        let loop=$('.delete-comment-button');
        for(i of loop ){
            deleteComment(i);
        }
    }


       //method to delete a post from DOM

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({

                        theme:'relax',
                        type:'success',
                        text:'Comment Removed!',
                        layout:'topRight',
                        timeout:1500


                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

       createComment();
           iterate_comment();

}