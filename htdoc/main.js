const public_key = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBmYU5bGoCc6/yoLOy8U9bEsyE
J8HSP7Go5qh5DhZqyUk7vTkOIN9RVdXUDMprvpBw3CP8NBNLTUXm/wCCmGJnObgu
VRt+ea1TkYvSm7tv366NyxvPNHSlE13sKw0t/I9Lzk1gOdVInJGm5wEBJK3C9Maq
3DUMYTZ+7r1U9iXwPQIDAQAB
-----END PUBLIC KEY-----`;


window.addEventListener("DOMContentLoaded", function() {
    const inputEl = document.getElementById("input");
    const bt = document.getElementById("sendBt");

    bt.onclick = function() {
        var crypt = new JSEncrypt();

        crypt.setPrivateKey(public_key);
        var plainText = inputEl.value
        var encryptedText = crypt.encrypt(plainText);
        console.log(encryptedText);


        fetch("./submit", {
            method : "POST",
            body : JSON.stringify({
                data : encryptedText,
            })
        })
    }
});