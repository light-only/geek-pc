import {useLocation,useNavigate} from 'react-router-dom'


//本来是react-router-dom v6使用的，但是发现这个类组件有bug，所以我这是回退了版本为react-router-dom v5版本，这个版本中有withRouter所以这里就不使用这个自定义封装组件了。
/**
 * 封装withRouter方法，用来实现this.props添加路由跳转方法
 * @param {component} Child 组件
 * @returns {function(*)}
 */
export function withRouter( Child ) {
    return ( props ) => {
        const location = useLocation();
        const navigate = useNavigate();
        return <Child { ...props } navigate={ navigate } location={ location } />;
    }
}
