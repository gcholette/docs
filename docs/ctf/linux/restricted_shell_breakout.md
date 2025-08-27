# Restricted shell breakout

## rbash
- [A medium article](https://systemweakness.com/how-to-breakout-of-rbash-restricted-bash-4e07f0fd95e)
- [A gist](https://gist.github.com/PSJoshi/04c0e239ac7b486efb3420db4086e290)
- [0xffsec handbook](https://0xffsec.com/handbook/shells/restricted-shells/)

View env variables
```bash
export -p
```

If you can ssh in the machine, you could try executing commands from the outside
```bash
ssh user@target -t "/bin/sh"
```