exports.getVoucherTypeList = (voucherList) => {
    const firstVoucherType = {
        voucherTypeId: voucherList[0].voucherTypeId,
        voucherType: voucherList[0].voucherType,
    };
    const voucherTypeList = [firstVoucherType];
    for (let i = 1; i < voucherList.length; i++) {
        if (
            !voucherTypeList.some(
                (obj) => obj.voucherTypeId === voucherList[i].voucherTypeId,
            )
        ) {
            voucherTypeList.push({
                voucherTypeId: voucherList[i].voucherTypeId,
                voucherType: voucherList[i].voucherType,
            });
        }
    }
    return voucherTypeList;
};

/**
 * Build the voucher tree from the voucher list
 *
 * @param {voucher[]} voucherList A list of voucher with voucherTypeId
 * @returns {VoucherTree[]} An array of trie, each tree is a branch of voucher
 */
exports.buildVoucherTree = (voucherList) => {
    const voucherTypeList = this.getVoucherTypeList(voucherList);
    for (let i = 0; i < voucherTypeList.length; i++) {
        const vouchers = voucherList
            .filter(
                (el) => el.voucherTypeId === voucherTypeList[i].voucherTypeId,
            )
            .map((el) => {
                delete el.voucherTypeId;
                delete el.voucherType;
                return el;
            });
        voucherTypeList[i] = {
            ...voucherTypeList[i],
            length: vouchers.length,
            vouchers,
        };
    }
    return voucherTypeList;
};
