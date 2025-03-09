# Website for Hensmåla Triathlon
Hensmåla mini triathlon for ALS

## Run locally with
### Netlify cli
For local netlify functions
```
netlify dev
```

### Stripe cli
For local netlify stripe webhook functions

```
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
```
