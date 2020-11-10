/*
A linked list of refStates, their components, AND the added properties we create
when we detect that a ref is a query or deep memo ref. 
*/

function RefNode(refId, component, ref, tag) {
  this.epochRefId = refId;
  this.component = component;
  this.next = null;
  this.ref = ref;
  this.epochRefTag = tag;
}

function EpochRefList() {
  let nextId = 1;
  this.head = null;
  this.tail = null;
  this.circularReference = new Set();

  Object.defineProperties(this, {
    nextRefId: {
      get() {
        return nextId;
      },
      set(x) {
        // eslint-disable-next-line no-multi-assign
        nextId = nextId += 1;
      },
    },
  });
}

EpochRefList.prototype.addRef = function (component, ref, refId, tag) {
  if (this.circularReference.has(ref)) {
    return ref;
  }

  const newRefNode = new RefNode(refId, component, ref, tag);

  if (!this.head) {
    this.head = newRefNode;
    this.tail = this.head;
    this.circularReference.add(ref);
    return newRefNode;
  }

  this.tail.next = newRefNode;
  this.tail = newRefNode;
  this.circularReference.add(ref);
  return newRefNode;
};

EpochRefList.prototype.claimRefId = function () {
  const refId = this.nextRefId;
  this.nextRefId += 1;
  return refId;
};

export default EpochRefList;
