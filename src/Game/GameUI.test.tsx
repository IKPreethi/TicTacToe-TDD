import React from 'react';
import Game from './Game';
import { configure, ShallowWrapper } from 'enzyme';
import { USER_ENTITY } from './constant';
import Adapter from 'enzyme-adapter-react-16';
import { shallow} from 'enzyme';
import { UserEntityPlugin } from './Plugin/storePlugin';
import { createUnifiedStore, InstanceId, IUnifiedStore } from '@sap/unified-store';


configure({ adapter: new Adapter() });

let store: IUnifiedStore;
store = createUnifiedStore({
    [USER_ENTITY]: UserEntityPlugin
});

const storeInstanceId = new InstanceId([{ [USER_ENTITY]: 'guidstring'}]);

describe("Title testing", () => {
    let wrapper : ShallowWrapper;
    beforeEach(() => {
         wrapper = shallow( <Game storeId= {storeInstanceId} store = {store}/>);
    })
  test("button header", () => {
    expect(wrapper.find("button").text()).toBe("Reset")
  })
  test("Reset button", () => {
    wrapper.find("button").simulate("click")
    expect(wrapper.find("#user-tag").text().includes("X")).toBe(true)
  })

}) 