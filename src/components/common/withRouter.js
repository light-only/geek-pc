import {useLocation,useNavigate} from 'react-router-dom'

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
