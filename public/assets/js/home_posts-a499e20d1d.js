{let t=function(){let t=$("#new-post-form");t.submit((function(s){s.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){let s=e(t.data.post);$("#posts-list-container>ul").prepend(s),n($(" .delete-post-button",s)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",s)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`\n            <li  id="post-${t._id}" class="new-post">\n    <div> \n        <small id="post-user">\n            ${t.user.name}\n        </small>\n        <small id="post-content">\n        ${t.content}\n        </small>\n\n        <small id="like-del">\n\n        <small>\n            \n                <a class="toggle-like-button" data-likes="${t.like.length}" href="/likes/toggle/?id=<%=post._id%>&type=Post">\n                   <span class="toggle-like-button" style="color:white;"> ${t.like.length}  </span>\n                  <span class="toggle-like-button">♥</span>\n                </a>\n          \n        </small>\n         \n        <small>\n            <a class="delete-post-button"  href="/posts/destroy/${t._id}">X</a>\n        </small>\n        \n\n        </small>\n\n        <br>\n    </div>\n\n    <div class="post-comments">\n        \n            <form action="/comments/create" id="post-${t._id}-comments-form" class="new-comments-form" method="post">\n                <input id="create-comment" type="text" name="content" placeholder="Type Here to add comment..." required>\n                <input type="hidden" name="post" value="${t._id}" >\n                <input id="cmnt-btn" type="submit" value="Add Comment">\n            </form>\n\n       \n\n        <div class="post-comments-list">\n            <ul id="post-comments-${t._id}" class="content-style">\n                \n            </ul>\n        </div>\n    </div>\n    \n</li>\n            `)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post and Associated comments Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},s=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);console.log("#######",e),n(e);let s=t.prop("id").split("-")[1];new PostComments(s)}))};t(),s()}