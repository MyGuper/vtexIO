import type {
  InstanceOptions,
  IOContext
} from '@vtex/api';
import {
  ExternalClient,
} from '@vtex/api';

import axios from "axios";

const SECRETS = {
  "API_KEY": "everest-vtex-JCVEBIOS",
  "API_TOKEN": "O2E487KW1GTUPN5F3YCXR9AH"
}

const api = axios.create({
  baseURL: "https://everest.myguper.com/api",
  headers: {
    'x-guper-apikey': SECRETS.API_KEY,
    'x-guper-apisecret': SECRETS.API_TOKEN,
  }
})

export default class Guper extends ExternalClient {
  constructor(
    context: IOContext,
    options?: InstanceOptions
  ) {
    super(
      'https://everest.myguper.com',
      context,
      {
        ...options,
        headers: {
          ...options?.headers,
          'x-guper-apikey': SECRETS.API_KEY,
          'x-guper-apisecret': SECRETS.API_TOKEN,
        }
      }
    )
  }

  private getToken() {
    return api.get(`/connect/token`)
  }

  public async rewardByOrder(email: string, items?: { id: string, quantity: number, price: number, name: string }[]) {
    const token = await this.getToken();
    return api.post(`/loyalty/rewardByOrder`, {
      "interface": "everest",
      "storeId": "1",
      "client": {
        "email": email
      },
      ...(items && items.length > 0 ? { items } : {})
    }, {
      headers: {
        "x-guper-authorization": token.data.accessToken as unknown as string,
      }
    })
  }

  public async listForm(){
    const token = await this.getToken();

    return api.get(`/register/datacapture/sid?p=1&e=100`, {
      headers: {
        "x-guper-authorization": token.data.accessToken as unknown as string,
      }
    })
  }

  public async postForm(submissionKey: string, data: Record<string, any>) {
    const token = await this.getToken();

    return api.post(`/register/datacapture/submit/${submissionKey}`, {
      ...data,
    }, {
      headers: {
        "x-guper-authorization": token.data.accessToken as unknown as string,
      }
    })
  }

   public async getForm(formID: string, sID: string) {
    const token = await this.getToken();
    return api.get(`/register/datacapture/${formID}/render/${sID}`, {
      headers: {
        "x-guper-authorization": token.data.accessToken as unknown as string,
      }
    })
  }
}
