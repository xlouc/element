/** @format */

import navConfig from '../nav.config.json'

const verticalRender = function(h, context) {
  let menus = []
  navConfig.forEach(function(nav) {
    if (nav.href) {
      menus.push(
        <el-menu-item index={nav.href}>
          <a slot="title" href={nav.href} target="_blank">
            {nav.title || nav.name}
          </a>
        </el-menu-item>
      )
    } else if (nav.groups) {
      menus.push(
        <el-menu-item-group>
          <span slot="title">{nav.name}</span>
          {nav.groups.map(group => {
            return (
              <el-submenu index={group.groupName}>
                <span slot="title">{group.groupName}</span>
                {group.list.map(child => {
                  return (
                    <el-menu-item index={child.path}>
                      <span slot="title">{child.title}</span>
                    </el-menu-item>
                  )
                })}
              </el-submenu>
            )
          })}
        </el-menu-item-group>
      )
    } else if (nav.children) {
      menus.push(
        <el-menu-item-group>
          <span slot="title">{nav.name}</span>
          {nav.children.map(child => {
            return (
              <el-menu-item index={child.path}>
                <span slot="title">{child.name}</span>
              </el-menu-item>
            )
          })}
        </el-menu-item-group>
      )
    } else {
      menus.push(
        <el-menu-item index={nav.path}>
          <span slot="title">{nav.name}</span>
        </el-menu-item>
      )
    }
  })

  return menus
}
const horizontalRender = function(h, context) {
  let menus = []
  navConfig.forEach(function(nav) {
    if (nav.href) {
      menus.push(
        <el-menu-item index={nav.href}>
          <a slot="title" href={nav.href} target="_blank">
            {nav.title || nav.name}
          </a>
        </el-menu-item>
      )
    } else if (nav.groups) {
      nav.groups.forEach(group => {
        menus.push(
          <el-submenu index={group.groupName}>
            <span slot="title">{group.groupName}</span>
            {group.list.map(child => {
              return (
                <el-menu-item index={child.path}>
                  <span slot="title">{child.title}</span>
                </el-menu-item>
              )
            })}
          </el-submenu>
        )
      })
    } else if (nav.children) {
      menus.push(
        <el-submenu index={nav.name}>
          <span slot="title">{nav.name}</span>
          {nav.children.map(child => {
            return (
              <el-menu-item index={child.path}>
                <span slot="title">{child.name}</span>
              </el-menu-item>
            )
          })}
        </el-submenu>
      )
    } else {
      menus.push(
        <el-menu-item index={nav.path}>
          <span slot="title">{nav.name}</span>
        </el-menu-item>
      )
    }
  })
  return menus
}

export default {
  functional: true,
  render: function(h, context) {
    let menus = []
    if (context.data.attrs && context.data.attrs.mode === 'horizontal') {
      menus = horizontalRender(h, context)
    } else {
      menus = verticalRender(h, context)
    }

    return (
      <el-menu router {...context.data}>
        {menus}
      </el-menu>
    )
  }
}
