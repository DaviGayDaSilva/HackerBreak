# Hacker Break Build Scripts
# Build configurations for all supported platforms

## Supported Platforms:
- ✅ Android (.apk)
- ✅ Linux (.deb)
- ✅ Linux (.AppImage)
- ✅ CLI (Linux/Termux)

## Unsupported:
- ❌ Windows (.exe)
- ❌ iOS (.ipa)
- ❌ macOS (.dmg)

---

## Build Android APK

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## Build Linux DEB

```bash
cd core
cargo build --release --target x86_64-unknown-linux-gnu
```

---

## Build Linux AppImage

```bash
# Using appimagekit or cargo-appimage
cargo build --release
```

---

## Run CLI

```bash
chmod +x cli/bin/hbreak
./cli/bin/hbreak status
```

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `hbreak scan` | Security scan |
| `hbreak monitor` | Live monitor |
| `hbreak shield enable` | Enable shield |
| `hbreak block <ip>` | Block IP |
| `hbreak kill-session` | Kill sessions |
| `hbreak live` | Live monitor |
| `hbreak logs` | View logs |