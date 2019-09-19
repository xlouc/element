/** @format */

/* Automatically generated by './build/build-entry.js' */

import Alert from './components/alert/index.js'
import Aside from './components/aside/index.js'
import Autocomplete from './components/autocomplete/index.js'
import Avatar from './components/avatar/index.js'
import Backtop from './components/backtop/index.js'
import Badge from './components/badge/index.js'
import Breadcrumb from './components/breadcrumb/index.js'
import BreadcrumbItem from './components/breadcrumb-item/index.js'
import Button from './components/button/index.js'
import ButtonGroup from './components/button-group/index.js'
import Calendar from './components/calendar/index.js'
import Card from './components/card/index.js'
import Carousel from './components/carousel/index.js'
import CarouselItem from './components/carousel-item/index.js'
import Cascader from './components/cascader/index.js'
import CascaderPanel from './components/cascader-panel/index.js'
import Checkbox from './components/checkbox/index.js'
import CheckboxButton from './components/checkbox-button/index.js'
import CheckboxGroup from './components/checkbox-group/index.js'
import Col from './components/col/index.js'
import Collapse from './components/collapse/index.js'
import CollapseItem from './components/collapse-item/index.js'
import ColorPicker from './components/color-picker/index.js'
import Container from './components/container/index.js'
import DatePicker from './components/date-picker/index.js'
import Descriptions from './components/descriptions/index.js'
import DescriptionsItem from './components/descriptions-item/index.js'
import Dialog from './components/dialog/index.js'
import Divider from './components/divider/index.js'
import Drawer from './components/drawer/index.js'
import Dropdown from './components/dropdown/index.js'
import DropdownItem from './components/dropdown-item/index.js'
import DropdownMenu from './components/dropdown-menu/index.js'
import Empty from './components/empty/index.js'
import Footer from './components/footer/index.js'
import Form from './components/form/index.js'
import FormItem from './components/form-item/index.js'
import Header from './components/header/index.js'
import Icon from './components/icon/index.js'
import Image from './components/image/index.js'
import InfiniteScroll from './components/infinite-scroll/index.js'
import Input from './components/input/index.js'
import InputNumber from './components/input-number/index.js'
import Link from './components/link/index.js'
import List from './components/list/index.js'
import ListItem from './components/list-item/index.js'
import Loading from './components/loading/index.js'
import Main from './components/main/index.js'
import Menu from './components/menu/index.js'
import MenuItem from './components/menu-item/index.js'
import MenuItemGroup from './components/menu-item-group/index.js'
import Message from './components/message/index.js'
import MessageBox from './components/message-box/index.js'
import Notification from './components/notification/index.js'
import Option from './components/option/index.js'
import OptionGroup from './components/option-group/index.js'
import PageHeader from './components/page-header/index.js'
import Pagination from './components/pagination/index.js'
import Popover from './components/popover/index.js'
import Progress from './components/progress/index.js'
import Radio from './components/radio/index.js'
import RadioButton from './components/radio-button/index.js'
import RadioGroup from './components/radio-group/index.js'
import Rate from './components/rate/index.js'
import Result from './components/result/index.js'
import Row from './components/row/index.js'
import Scrollbar from './components/scrollbar/index.js'
import Select from './components/select/index.js'
import Skeleton from './components/skeleton/index.js'
import Slider from './components/slider/index.js'
import Spinner from './components/spinner/index.js'
import Statistic from './components/statistic/index.js'
import Step from './components/step/index.js'
import Steps from './components/steps/index.js'
import Submenu from './components/submenu/index.js'
import Switch from './components/switch/index.js'
import TabPane from './components/tab-pane/index.js'
import Table from './components/table/index.js'
import TableColumn from './components/table-column/index.js'
import Tabs from './components/tabs/index.js'
import Tag from './components/tag/index.js'
import TimePicker from './components/time-picker/index.js'
import TimeSelect from './components/time-select/index.js'
import Timeline from './components/timeline/index.js'
import TimelineItem from './components/timeline-item/index.js'
import Tooltip from './components/tooltip/index.js'
import Transfer from './components/transfer/index.js'
import Tree from './components/tree/index.js'
import Upload from './components/upload/index.js'
import locale from 'yak-ui/src/locale'
import CollapseTransition from 'yak-ui/src/transitions/collapse-transition'

const components = [
  Alert,
  Aside,
  Autocomplete,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  CascaderPanel,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  Container,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Empty,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Image,
  InfiniteScroll,
  Input,
  InputNumber,
  Link,
  List,
  ListItem,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Option,
  OptionGroup,
  PageHeader,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Result,
  Row,
  Scrollbar,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Statistic,
  Step,
  Steps,
  Submenu,
  Switch,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  Upload,
  CollapseTransition
]

const install = function(Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(InfiniteScroll)
  Vue.use(Loading.directive)

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.3.1',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition,
  Loading,
  Alert,
  Aside,
  Autocomplete,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  CascaderPanel,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  Container,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Empty,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Image,
  InfiniteScroll,
  Input,
  InputNumber,
  Link,
  List,
  ListItem,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Notification,
  Option,
  OptionGroup,
  PageHeader,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Result,
  Row,
  Scrollbar,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Statistic,
  Step,
  Steps,
  Submenu,
  Switch,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  Upload
}
