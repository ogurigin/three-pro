<template>
  <header  class="header-nav">
    <div style="margin-left: 24px; font-size: 1.5em; color: #fff; font-weight: bold;">
      LOGO
    </div>
  </header>
  <div class="main">
    <template v-for="item in menuList" :key="item.id">
    <div class="nav-title">{{item.title}}</div>
    <ul class="nav-list" v-for="menu in item.list" :key="menu.id">
      <li class="nav-item" @click="goItem(menu.path )">
        <img  class="cover" :src="menu.cover" alt="封面">
        <!-- <img src="@/assets/cover/torusGeometry.jpg" alt="封面" class="cover"> -->
        <div class="title">{{menu.title}}</div>
      </li>
    </ul>
    </template>
  </div>
</template>

<script setup>
 import cover1 from '@/assets/cover/torusGeometry.jpg';


const menuList = [
  {
    id:1,
    title:'基础',
    list :[
    {
      title:'textGeometry',path:'/base/textLoader',id:1,cover: cover1,
    }
    ]
  },
]
const router = useRouter();
const goItem = (path) => {
  router.push({path});
}
</script>
<style>
.header-nav{
  background: rgba(0,0,0,0.7); 
  height: 60px; 
  display: flex;
   align-items: center;
}
.main{
  padding: 20px;
  max-width: 1980px;
  margin: 0 auto;
}
.nav-title{
  font-size: 16px;
  font-weight: bold;
  position: relative;
  &::after{
    content: '';
    width: 4px;
    height: 20px;
    position: absolute;
    top:2px;
    left: -10px;
    background-color: pink;
  }
}
.nav-list{
   list-style: none;
   padding:20px 0;
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
   .nav-item{
     width: 208px;
     height: 60px;
     cursor: pointer;
     text-align: center;
      .cover{
       width: 208px;
       height: 148px;
       border-radius: 10px;
       object-fit: cover;
     }
     &:hover{
       .cover{
         transform: scale(1.1);
         transition: all 0.3s ease-in-out;
       }
     }
     .title{
      width: 100%;
      font-weight: bold ;
      font-size: 18px;
      text-align: center;
    }
   }
}

</style>
