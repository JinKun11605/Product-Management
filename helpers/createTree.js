module.exports = function createTree (arr, parentId = "") {
    const tree = [];

    arr.forEach(item => {
        if (item.parent_id === parentId) {
            const newItem = item;
            let children = createTree(arr, newItem.id);

            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem)
        }
    });
    return tree;
}