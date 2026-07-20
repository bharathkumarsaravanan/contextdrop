import "server-only";
import crypto from "crypto";

const ALGORITHM = 'aes-256-gcm';

function getEncryptionKey() {
    const secret = process.env.API_KEY_ENCRYPTION_SECRET;

    if (!secret) {
        throw new Error("API_KEY_ENCRYPTION_SECRET is not configured");
    }

    const key = Buffer.from(secret, "base64");

    if (key.length !== 32) {
        throw new Error("API_KEY_ENCRYPTION_SECRET must decode to exactly 32 bytes");
    }

    return key;
}

export type EncryptedValue = {
    encryptedValue: string;
    iv: string;
    authTag: string;
};

export function encryptValue(value: string) : EncryptedValue {
    const key =getEncryptionKey();
    const iv = crypto.randomBytes(12);

    const ciper = crypto.createCipheriv(
        ALGORITHM,
        key,
        iv
    );

    const encrypted = Buffer.concat([
        ciper.update(value, 'utf-8'),
        ciper.final(),
    ]);
    const authTag = ciper.getAuthTag();

    return {
        encryptedValue: encrypted.toString("base64"),
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64")
    }
}

export function decryptValue({
    encryptedValue,
    iv,
    authTag,
}: EncryptedValue) {

    const key = getEncryptionKey();

    const deciper = crypto.createDecipheriv(
        ALGORITHM,
        key,
        Buffer.from(iv, "base64")
    );

    deciper.setAuthTag(
        Buffer.from(authTag, "base64")
    );

    const decrypted = Buffer.concat([
        deciper.update(
            Buffer.from(encryptedValue, "base64")
        ),
        deciper.final(),
    ]);

    return decrypted.toString("utf-8")
}
