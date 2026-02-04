import { Directive } from '@angular/core';

@Directive({ selector: '[tngCodeBlockCopy]', standalone: true })
export class TngCodeBlockCopySlot {}

@Directive({ selector: '[tngCodeBlockCopied]', standalone: true })
export class TngCodeBlockCopiedSlot {}