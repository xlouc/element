<template>
  <div class="side-nav">
    <ul>
      <li class="nav-item" v-for="(item, key) in navs" :key="key">
        <template v-if="item.title || item.name">
          <a v-if="!item.path && !item.href">{{ item.name }}</a>
          <a v-if="item.href" :href="item.href" target="_blank">{{ item.name }}</a>
          <router-link
            v-if="item.path"
            active-class="active"
            :to="base + item.path"
            exact
            v-text="item.title || item.name"
          ></router-link>
        </template>
        <ul class="pure-menu-list sub-nav" v-if="item.children">
          <li class="nav-item" v-for="(navItem, key) in item.children" :key="key">
            <router-link
              class=""
              active-class="active"
              :to="base + navItem.path"
              exact
              v-text="navItem.title || navItem.name"
            ></router-link>
          </li>
        </ul>
        <template v-if="item.groups">
          <div class="nav-group" v-for="(group, key) in item.groups" :key="key">
            <div class="nav-group__title">{{ group.groupName }}</div>
            <ul class="pure-menu-list">
              <li class="nav-item" v-for="(navItem, key) in group.list" v-show="!navItem.disabled" :key="key">
                <router-link active-class="active" :to="base + navItem.path" exact v-text="navItem.title"></router-link>
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    base: {
      type: String,
      default: ''
    },
    navs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import 'main/style/common/var.scss';

.side-nav {
  width: 100%;
  box-sizing: border-box;
  transition: opacity 0.3s;
  position: relative;
  min-height: 100%;

  &::after {
    position: absolute;
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background: $--border-color-base;
    top: 0;
    right: 0;
    bottom: 0;
  }

  &.is-fade {
    transition: opacity 3s;
  }
  li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  > ul > .nav-item > a:not(.item) {
    margin-top: 15px;
  }

  .nav-item {
    a {
      font-size: 16px;
      color: #333;
      line-height: 40px;
      height: 40px;
      margin: 2px 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: 0.15s ease-out;
      font-weight: bold;
      &.active {
        color: $--color-primary;

        &:after {
          position: absolute;
          content: '';
          z-index: 30;
          display: block;
          width: 2px;
          height: 100%;
          background: $--color-primary;
          right: 0;
          top: 0;
          bottom: 0;
        }
      }
    }

    .nav-item {
      a {
        display: block;
        height: 40px;
        color: #444;
        line-height: 40px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;
        padding: 0 15px;
        &:hover,
        &.active {
          color: $--color-primary;
          background-color: $--color-primary-light-9;
        }
      }
    }

    &.sponsors {
      & > .sub-nav {
        margin-top: -10px;
      }

      & > a {
        color: #777;
        font-weight: 300;
        font-size: 14px;
      }

      .nav-item {
        display: inline-block;

        a {
          height: auto;
          display: inline-block;
          vertical-align: middle;
          margin: 8px 12px 12px 0;
          img {
            width: 42px;
          }
        }
        &:first-child a img {
          width: 36px;
        }
      }
    }
  }
  .nav-group__title {
    font-size: 12px;
    color: #999;
    line-height: 26px;
    margin-top: 15px;
  }
  #code-sponsor-widget {
    margin: 0 0 0 -20px;
  }
}
.nav-dropdown-list {
  width: 120px;
  margin-top: -8px;
  li {
    font-size: 14px;
  }
}
</style>
