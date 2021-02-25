import React, { Context, Dispatch, FC, useEffect, useState } from 'react'
export abstract class AbstractStore {
    private setStates = new Array<Dispatch<number>>()
    private ticket = 0;
    /**
     * 通知所有监听的React组件重新渲染
     * 从render 到重新渲染是一个异步的过程，并且调用render的成本不高，不需要太精细规划render
     */
    render() {
        const newTicket = ++this.ticket
        requestAnimationFrame(() => {
            if (this.ticket === newTicket) {
                this.setStates.forEach(setState => setState(newTicket))
            }
        })
    }
    /**
     * 在当前组件监听数据变动， 当render的时候重新渲染
     */
    createEffectCb(setState:Dispatch<number>){
        return ()=>{
            this.setStates.push(setState)
            return ()=>{
                this.setStates = this.setStates.filter(disp=>disp!==setState)
            }
        }
    }

}
export function  useWatch(store:AbstractStore) {
    const [, setState] = useState(0)
    useEffect(store.createEffectCb(setState),[])
}
interface StoreContextData<T extends AbstractStore>{
    context: Context<T>
    store: T
}
export function storeBindContext<T extends AbstractStore>(store: T, context: Context<T>){
    return {context, store}
}
export const StoreProvider: FC<{stores: StoreContextData<any>[]}> = props=>{
    let top: any = props.children
    for(const prop of props.stores){
        const context = prop.context
        top = <context.Provider value={prop.store}>{top}</context.Provider>
    }
    return top
}