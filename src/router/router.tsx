import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PersonCenter from "@/view/person-work/project/project"
import PersonWork from "@/view/person-work/person-work"
import NoMatch from '@/view/no-match/no-match'
import Account from "@/view/person-center/account/account"
import Grade from "@/view/person-work/grade/grade"
import Test from './../view/components-test/index';

export interface RouteType {
    pathname?: string;
    component:  React.FunctionComponent<any>| React.ComponentClass<any>;
    exact: boolean;
    auth?: boolean
    title?: string;
    icon?: string;
    children?: RouteType[];
}
export const prefix = "/user/account"
export const AppRoutes: RouteType[] = [
    {
        pathname: "/center",
        component: PersonCenter,
        auth: false,
        exact: false,
        children: [{
            pathname: "/center/account",
            component: Account,
            auth: false,
            exact: true,
        }, {
            pathname: "/center/account1",
            component: Account,
            auth: false,
            exact: false,
        }]
    },
    {
        pathname: "/work",
        component: PersonWork,
        auth: false,
        exact: false,
        children: [{
            pathname: "/work/grade",
            component: Grade,
            auth: false,
            exact: false,
        }]
    },
    {
        pathname: "/404",
        exact: true,
        auth: false,
        component: NoMatch,
    }, {
        pathname: "/test",
        exact: true,
        auth: false,
        component: Test,
    },
];

export const renderRouter = (router: RouteType[]) => {

    const routers = (router: RouteType[]) => {
        return router.map((item: RouteType) => {
            return (
                <Route
                    path={prefix + item.pathname}
                    exact={item.exact ? item.exact : false}
                    key={item.pathname}
                    render={
                        () => {
                            return <item.component>
                                {item.children ? routers(item.children) : null}
                            </item.component>
                        }
                    }
                >

                </Route>
            );
        })
    }
    return <Switch>
        {routers(router)}
        <Redirect exact path="/eda" to={{ pathname: '/eda/log' }}></Redirect>
        <Route component={NoMatch}></Route>
    </Switch>
};

