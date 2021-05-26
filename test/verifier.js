// SPDX-License-Identifier: AGPL-3.0-only

exports.NOT_AUTHORIZED_ERROR = "Error: Returned error: VM Exception while processing transaction: revert " +
    "sender not authorized -- Reason given: sender not authorized.";
exports.LOCKED_ERROR = "Error: Returned error: VM Exception while processing transaction: revert not enough " +
    "non-locked tokens -- Reason given: not enough non-locked tokens.";
exports.LOCK_UPDATE_ERROR = "Error: Returned error: VM Exception while processing transaction: revert locks can only " +
    "be extended -- Reason given: locks can only be extended.";
exports.BAD_INPUT_ERROR = "Error: Returned error: VM Exception while processing transaction: revert bad inputs " +
    "-- Reason given: bad inputs.";
exports.LOW_BALANCE_ERROR = "Error: Returned error: VM Exception while processing transaction: revert profit balance " +
    "is not enough -- Reason given: profit balance is not enough.";
exports.WITHDRAW_NOT_ALLOWED_ERROR = "Error: Returned error: VM Exception while processing transaction: revert " +
    "withdrawal not allowed -- Reason given: withdrawal not allowed.";
exports.ALREADY_REGISTERED_ERROR = "Error: Returned error: VM Exception while processing transaction: revert already " +
    "registered -- Reason given: already registered.";
exports.GENERAL_ERROR = "Error: Returned error: VM Exception while processing transaction: revert";
exports.PRECISION_ERROR = "Error: Returned error: VM Exception while processing transaction: revert not enough " +
    "precision -- Reason given: not enough precision.";
exports.FINAL_SOURCES_ERROR = "Error: Returned error: VM Exception while processing transaction: revert profit " +
    "sources are final -- Reason given: profit sources are final.";
exports.TOO_EARLY_ERROR = "Error: Returned error: VM Exception while processing transaction: revert too early -- " +
    "Reason given: too early.";

exports.ERC20 = {
    ALLOWANCE_ERROR: "Error: Returned error: VM Exception while processing transaction: revert " +
        "ERC20: transfer amount exceeds allowance -- Reason given: ERC20: transfer amount exceeds allowance.",
    TRANSFER_ERROR: "Error: Returned error: VM Exception while processing transaction: revert ERC20: transfer amount " +
        "exceeds balance -- Reason given: ERC20: transfer amount exceeds balance.",
    BURN_ERROR: "Error: Returned error: VM Exception while processing transaction: revert ERC20: burn amount exceeds " +
        "balance -- Reason given: ERC20: burn amount exceeds balance."
}

exports.Mintable = {
    MINT_ALLOWANCE_ERROR: "Error: Returned error: VM Exception while processing transaction: revert amount " +
        "exceeds minting allowance -- Reason given: amount exceeds minting allowance.",
    EXCEEDS_MAX_SUPPLY_ERROR: "Error: Returned error: VM Exception while processing transaction: revert " +
        "totalSupply exceeds limit -- Reason given: totalSupply exceeds limit.",
}

exports.CrowdFunding = {
    AMOUNT_TOO_HIGH_ERROR: "Error: Returned error: VM Exception while processing transaction: revert amount is too " +
        "high -- Reason given: amount is too high.",
    DURATION_ERROR: "Error: Returned error: VM Exception while processing transaction: revert redemption duration " +
        "must be less than 3 years -- Reason given: redemption duration must be less than 3 years.",
    ZERO_PRICE_ERROR: "Error: Returned error: VM Exception while processing transaction: revert price can't be " +
        "zero -- Reason given: price can't be zero.",
    MIN_ACTIVATION_ERROR: "Error: Returned error: VM Exception while processing transaction: revert " +
        "minFiatForActivation is too high -- Reason given: minFiatForActivation is too high.",
    REDEMPTION_RATIO_ERROR: "Error: Returned error: VM Exception while processing transaction: revert invalid " +
        "redemption ratio -- Reason given: invalid redemption ratio.",
};

exports.Ballot = {
    NOT_ENOUGH_LOCKED_ERROR: "Error: Returned error: VM Exception while processing transaction: revert locked amount " +
        "not enough -- Reason given: locked amount not enough.",
    LOCK_TOO_SHORT_ERROR: "Error: Returned error: VM Exception while processing transaction: revert lock period is " +
        "too short -- Reason given: lock period is too short.",
}

exports.Governance = {
    BALLOT_NOT_FOUND_ERROR: "Error: Returned error: VM Exception while processing transaction: revert ballot " +
        "not found -- Reason given: ballot not found.",
}

exports.expectError = async function (promise, error) {
    let passed = false;
    try {
        await promise;
        passed = true;
    } catch (e) {
        assert.equal(e.toString(), error, "Invalid error");
    }
    if (passed) throw(`No errors given, While expecting: ${error}`);
}

exports.check = async function (f, wants, accounts, exact, name, decimals) {
    for (let i = 0; i < wants.length; i++) {
        const got = (await f(accounts[i])).valueOf();
        const want = Math.round(wants[i] * decimals);
        //console.log(got.toString());
        if (exact) {
            assert.equal(got, want, `In ${name}, for acc${i}`);
        } else {
            assert.isOk(
                want - got >= 0 && want - got <= 1,
                `In ${name}, for acc${i} got ${got} but wanted a value close to ${want}`
            );
        }
    }
}