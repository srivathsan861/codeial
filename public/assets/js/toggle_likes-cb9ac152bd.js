class ToggleLike{constructor(t){this.toggler=t,this.toggleLike()}toggleLike(){$(this.toggler).click((function(t){t.preventDefault();let e=this;$.ajax({type:"POST",url:$(e).attr("href")}).done((function(t){let l=parseInt($(e).attr("data-likes"));console.log(l),1==t.data.deleted?l-=1:l+=1,$(e).attr("data-likes",l),$(e).html(`\n                    <span  style="color:white; margin:5px;">${l}</span><span style="color:red; margin:5px;">♥</span>\n                    `)})).fail((function(t){console.log("error in completing the request")}))}))}}