// Remove tag A wuth mousedown
$('body').on('mousedown', 'a', function(e) {
  e.preventDefault();
});


// Search btn - Mobile
$('#search-btn').click(function() {
  $('.search-m').toggleClass('active');
  if($('.search-m').attr('class') == 'search-m active') {
    $('.nav').css('border-bottom','1px solid #fff');
  } else {
    $('#search-m').blur();
    $('.nav').css('border-bottom','1px solid #e2e2e2');
  }
})
function close_search_m() {
  $('#search-m').blur();
  $('.search-m').removeClass('active');
  if($('.search-m').attr('class') != 'search-m active') {
    $('.nav').css('border-bottom','1px solid #e2e2e2');
  }
}


// Menu btn
$('#menu-btn').click(function() {
  if($('header').attr('class') == $('aside').attr('class')) {
    $('header').toggleClass('active');
    $('aside').toggleClass('active');
  } else if($('header').attr('class') == 'active' && $('aside').attr('class') != 'active') {
    $('header').removeClass('active');
  } else if($('header').attr('class') != 'active' && $('aside').attr('class') == 'active') {
    $('header').addClass('active');
  }
  close_search_m();
})

$('#aside-btn').click(function() {
  $('aside').toggleClass('active');
  close_search_m();
})


// Nav user menu
const user_set_btn = document.querySelector('main .nav .user-menu #user-menu-btn');
const user_set_menu = document.querySelector('main .nav .user-menu .user-menu-box');
function remove_set_menu(e) {
  user_set_menu.classList.remove('active');
  document.removeEventListener("click",remove_set_menu);
}

if(user_set_btn) {
  user_set_btn.addEventListener("click",(e)=>{
    e.stopPropagation();
    close_search_m();
    if(user_set_menu.classList.toggle('active')) {
      document.addEventListener("click",remove_set_menu);
    }
  })
  user_set_menu.addEventListener("click",(e)=>e.stopPropagation());
}


// Click with hide menu and search
$('article, aside .aside-content').on('click', function() {
  $(user_set_menu).removeClass('active');
  close_search_m();
})

$('article').on('click', function() {
  $('header').removeClass('active');
  $('aside').removeClass('active');
  close_search_m();
})

$('header').on('click', function() {
  close_search_m();
})


// Horizontal scrolling
const cateTagContainer = document.querySelectorAll(`
  .category main .content article .categories ul, 
  .tag main .content article .tag-bar ul,
  .note main .content article .note-bar ul,
  .single main .content article .post-cover .post-info .more,
  .home main .content article .bottom .recommend-bar
`);

if(cateTagContainer) {
  $(cateTagContainer).each(function(i) {
    cateTagContainer[i].addEventListener("wheel", (event) => {
      event.preventDefault();
      cateTagContainer[i].scrollLeft += event.deltaY;
    });
  })
}


// Menu tooltip
const menuItemA = document.querySelectorAll('header .menu > li > a');

if(menuItemA) {
  let menuItemTitle = [];
  $(menuItemA).each(function(i) {
    menuItemTitle[i] = $(menuItemA[i]).attr('title');
    if(menuItemTitle[i]) {
      $(menuItemA[i]).attr('title','');
      $('<span class="menu-item-title"></span>').text(menuItemTitle[i]).appendTo(menuItemA[i]);
    } else {
      // console.log(false);
    }
  })
}


// Home new or sticky
$('.home .recommend-bar ul .slider').width($('.home .recommend-bar ul li a.active').outerWidth());
$('.home .recommend-bar ul li a').each(function(i) {
  $(this).attr('index',i);
  $(this).click(function() {
    $('.home .recommend-bar ul li a').removeClass('active');
    $(this).addClass('active');
    let width = $(this).outerWidth();
    let position = $(this).position();
    let scrollLeft = $('.home .recommend-bar ul').scrollLeft();
    $(".home .recommend-bar ul .slider").css({
      width: width,
      left: position.left + scrollLeft,
    });
    // console.log(position.left);
    $('.home .post-part').removeClass('active');
    $($('.home .post-part')[$(this).attr('index')]).addClass('active');
  })
})

// aside sub page
const aside_btn_open = $('aside .aside-content .aside-btn-open');
const aside_btn_close = $('aside .aside-content .aside-btn-close');

aside_btn_open.on('click', function() {
  $('aside .aside-content').addClass('active');
  $('aside .aside-content .main-page').removeClass('active');
  $('aside .aside-content .sub-page').addClass('active');
})
aside_btn_close.on('click', function() {
  $('aside .aside-content').removeClass('active');
  $('aside .aside-content .sub-page').removeClass('active');
  $('aside .aside-content .main-page').addClass('active');
})


// aside sub page menu
const menu_parent = $('.sub-page .menu_sidebar > ul > li.menu-item-has-children');
let menu_parent_hight = [];
let menu_parent_a_hight = [];
$(document).ready(function() {
  $(menu_parent).each(function(i) {
    menu_parent_hight[i] = $(this).outerHeight();
    menu_parent_a_hight[i] = $(this).children('a').outerHeight();
    $(this).height(menu_parent_a_hight[i]);
    $(this).children('a').on('click', function(e) {
      e.preventDefault();
      if(!$(this).hasClass('active')) {
        $(this).parent().height(menu_parent_hight[i]);
        $(this).children('.arrow').addClass('active');
        $(this).addClass('active');
      } else {
        $(this).parent().height(menu_parent_a_hight[i]);
        $(this).children('.arrow').removeClass('active');
        $(this).removeClass('active');
      }
    })

    $(document).click((e)=>{
      if($(this).children('a').hasClass('active')) {
        if(!$(e.target).is($(this).children('a, ul')) && !$(e.target).is(this.querySelectorAll('ul li ul li a, a *'))) {
          $(this).height(menu_parent_a_hight[i]);
          $(this).children('a').removeClass('active');
          $(this.querySelector('.arrow')).removeClass('active');
        }
      }
    })
  })
})


// toc
const post_title = $(`
.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6
`);

function add_toc() {
  let title_i = 1;
  post_title.each(function() {
    $(this).attr('id', 'title-' + title_i);
    $('aside .toc ul').append('<li id="' + $(this).prop('tagName') + '"><a href="#title-' + title_i+'">' + $(this).text() + '</a></li>');
    title_i ++;
  })
}

if($('.toc').length > 0 && post_title.length >= 2) {
  $('aside .toc').show();
  add_toc();
} else {
  $('aside .toc').hide();
}

// 顶部参与讨论按钮
if($('.single .shortcuts .to-comment').length){
  $('.single .shortcuts .to-comment').on('click', function(){
    $('article').animate({scrollTop:$('#response').offset().top - 115}, 300);
  })
}

$('.menu ul li a').each((i, e) => {
  // 获取当前页面的路径（不包括查询参数和哈希）
  var route = location.href.split(/[?#]/)[0];

  let href = e.href.split(/[?#]/)[0];
  // 获取当前菜单项的路径（不包括查询参数和哈希）
  if(e.href.indexOf('?preview-theme') != -1) {
    href =e.href;
  }

  // 比较当前页面的路径和菜单项的路径
  if (route === href) {
    e.parentElement.classList.add('current-menu-item');
  }
});

//处理瞬间权限
async function role() {
  const response = await fetch(`/apis/api.console.halo.run/v1alpha1/users/-`);
  const data = await response.json();
  var roles = data.roles;

  if(roles.length>0) {
    var name = roles[0].metadata.name
    if(name != 'super-role') {
      let dependencies = roles[0].metadata.annotations["rbac.authorization.halo.run/dependencies"]
      const disallowAccessConsole = roles[0].metadata.annotations["rbac.authorization.halo.run/disallow-access-console"]
      if(dependencies != undefined) {
        const momentsRole = ["role-template-moments-manage"]
        const momentsResult = momentsRole.some(r => dependencies.includes(r));
        const momentsRoleUc = ["role-template-moments-manage","role-template-uc-moments-publish"]
        const momentsResultUc = momentsRoleUc.some(r => dependencies.includes(r));
        const postRolesUc = ["role-template-post-author","role-template-post-publisher","role-template-post-contributor"]
        const postResultUc = postRolesUc.some(r => dependencies.includes(r));
        const postRoles = ["role-template-manage-posts"]
        const postResult = postRoles.some(r => dependencies.includes(r));
        if (momentsResult == false || disallowAccessConsole == true) {
          if (!momentsResultUc) {
            $('#momentsEdit').remove();
          }else {
            $('#momentsEdit')[0].href = '/uc/moments'
          }
        }
        if (postResult == false || disallowAccessConsole == true) {
          if (!postResultUc) {
            $('#postsEdit').remove();
          }else {
            $('#postsEdit')[0].href = '/uc/posts'
          }
        }
      }else {
        $('#postsEdit').remove();
        $('#momentsEdit').remove();
      }
    }
  }
}


role();