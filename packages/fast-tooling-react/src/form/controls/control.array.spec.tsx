import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";
import ArrayControlStyled, { ArrayControl } from "./control.array";
import { ArrayControlProps } from "./control.array.props";
import { ArrayControlClassNameContract } from "./control.array.style";
import HTML5Backend from "react-dnd-html5-backend";
import { ContextComponent, DragDropContext } from "react-dnd";

const TestArrayControl: typeof ArrayControl & ContextComponent<any> = DragDropContext(
    HTML5Backend
)(ArrayControl);

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const arrayProps: ArrayControlProps = {
    dataLocation: "",
    schemaLocation: "",
    value: "",
    schema: {},
    minItems: 0,
    maxItems: Infinity,
    onChange: jest.fn(),
    onAddExampleData: jest.fn(),
    onUpdateSection: jest.fn(),
    reportValidity: jest.fn(),
    disabled: false,
    elementRef: null,
    updateValidity: jest.fn(),
};

const managedClasses: ArrayControlClassNameContract = {
    arrayControl: "arrayControl-class",
    arrayControl__disabled: "arrayControl__disabled-class",
    arrayControl__invalid: "arrayControl__disabled-class",
    arrayControl_addItem: "arrayControl_addItem-class",
    arrayControl_addItemLabel: "arrayControl_addItemLabel-class",
    arrayControl_addItemButton: "arrayControl_addItemButton-class",
    arrayControl_existingItemList: "arrayControl_existingItemList-class",
    arrayControl_existingItemListItem: "arrayControl_existingItemListItem-class",
    arrayControl_existingItemListItemLink: "arrayControl_existingItemListItemLink-class",
    arrayControl_existingItemListItemLink__default:
        "arrayControl_existingItemListItemLink__default-class",
    arrayControl_existingItemRemoveButton: "arrayControl_existingItemRemoveButton-class",
};

describe("ArrayControl", () => {
    test("should not throw", () => {
        expect(() => {
            mount(<ArrayControlStyled {...arrayProps} />);
        }).not.toThrow();
    });
    test("should generate a button to add an array item if the maximum number of items has not been reached", () => {
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                maxItems={2}
                value={["foo"]}
                managedClasses={managedClasses}
            />
        );

        expect(
            rendered.find(`.${managedClasses.arrayControl_addItemButton}`).length
        ).toEqual(1);
    });
    test("should generate a button to add an array item if no maximum number of items has been specified", () => {
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={["foo"]}
                managedClasses={managedClasses}
            />
        );

        expect(
            rendered.find(`.${managedClasses.arrayControl_addItemButton}`).length
        ).toEqual(1);
    });
    test("should not generate a button to add an array item if the maximum number of items has been reached", () => {
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                maxItems={2}
                value={["foo", "bar"]}
                managedClasses={managedClasses}
            />
        );

        expect(
            rendered.find(`.${managedClasses.arrayControl_addItemButton}`).length
        ).toEqual(0);
    });
    test("should add an item to the array if the add button has been clicked", () => {
        const callback: any = jest.fn();
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={["foo"]}
                managedClasses={managedClasses}
                onChange={callback}
            />
        );
        const addButton: any = rendered.find(
            `.${managedClasses.arrayControl_addItemButton}`
        );
        addButton.simulate("click");

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0][0]).toEqual({ value: void 0, isArray: true });
    });
    test("should show a remove button on an existing array item if the minimum number of items has not been reached", () => {
        const callback: any = jest.fn();
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={["foo", "bar", "bat"]}
                managedClasses={managedClasses}
                onChange={callback}
            />
        );

        expect(
            rendered.find(`.${managedClasses.arrayControl_existingItemRemoveButton}`)
                .length
        ).toBe(3);
    });
    test("should show a remove button on an existing array item if the minimum number of items has not been specified", () => {
        const callback: any = jest.fn();
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={["foo", "bar"]}
                managedClasses={managedClasses}
                onChange={callback}
            />
        );

        expect(
            rendered.find(`.${managedClasses.arrayControl_existingItemRemoveButton}`)
                .length
        ).toBe(2);
    });
    test("should not show a remove button on existing array items if the minimum number of items has been reached", () => {
        const callback: any = jest.fn();
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={["foo", "bar"]}
                minItems={2}
                managedClasses={managedClasses}
                onChange={callback}
            />
        );

        expect(
            rendered.find(`.${managedClasses.arrayControl_existingItemRemoveButton}`)
                .length
        ).toBe(0);
    });
    test("should remove an array item if the remove button has been clicked", () => {
        const callback: any = jest.fn();
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={["foo", "bar", "bat"]}
                managedClasses={managedClasses}
                onChange={callback}
            />
        );
        const removeButton: any = rendered
            .find(`.${managedClasses.arrayControl_existingItemRemoveButton}`)
            .at(1);
        removeButton.simulate("click");

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0][0]).toEqual({
            value: undefined,
            isArray: true,
            index: 1,
        });
    });
    test("should not show default values if data exists", () => {
        const arrayItem1: string = "foo";
        const arrayItem2: string = "bar";
        const defaultArrayItem1: string = "hello";
        const defaultArrayItem2: string = "world";
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={[arrayItem1, arrayItem2]}
                default={[defaultArrayItem1, defaultArrayItem2]}
                managedClasses={managedClasses}
            />
        );
        expect(rendered.html().includes(arrayItem1)).toBe(true);
        expect(rendered.html().includes(arrayItem2)).toBe(true);
        expect(rendered.html().includes(defaultArrayItem1)).toBe(false);
        expect(rendered.html().includes(defaultArrayItem2)).toBe(false);
    });
    test("should fire an `onSectionUpdate` callback with a link is clicked", () => {
        const handleSectionUpdate: any = jest.fn();
        const arrayItem1: string = "foo";
        const arrayItem2: string = "bar";
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={[arrayItem1, arrayItem2]}
                managedClasses={managedClasses}
                onUpdateSection={handleSectionUpdate}
            />
        );

        rendered
            .find("a")
            .at(0)
            .simulate("click");

        expect(handleSectionUpdate).toHaveBeenCalled();
        expect(handleSectionUpdate.mock.calls[0][0]).toEqual({
            dataLocation: "[0]",
            schemaLocation: "items",
        });

        const handleSectionUpdateWithTestLocations: any = jest.fn();
        const renderedWithTestLocations: any = mount(
            <TestArrayControl
                {...arrayProps}
                value={[arrayItem1, arrayItem2]}
                managedClasses={managedClasses}
                onUpdateSection={handleSectionUpdateWithTestLocations}
                schemaLocation={"properties.test"}
                dataLocation={"test"}
            />
        );

        renderedWithTestLocations
            .find("a")
            .at(0)
            .simulate("click");

        expect(handleSectionUpdateWithTestLocations).toHaveBeenCalled();
        expect(handleSectionUpdateWithTestLocations.mock.calls[0][0]).toEqual({
            schemaLocation: "properties.test.items",
            dataLocation: "test[0]",
        });
    });
    test("should add a disabled class if the disabled prop has been passed", () => {
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                disabled={true}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.find(`.${managedClasses.arrayControl__disabled}`)).toBeTruthy();
    });
    test("should add an invalid class if the invalidMessage prop is not an empty string", () => {
        const rendered: any = mount(
            <TestArrayControl
                {...arrayProps}
                invalidMessage={"foo"}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.find(`.${managedClasses.arrayControl__invalid}`)).toBeTruthy();
    });
});
